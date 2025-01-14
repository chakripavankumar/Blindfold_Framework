"use server";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { db } from "@/lib/Prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

const serializeTransaction = (obj: {
  amount?: any; 
  balance?: any;
  userId: string;
  name: string;
  id: string;
  isDefault: boolean;
}) => {
  const serialized = { ...obj };
  if (obj.balance) {
    serialized.balance = Number(obj.balance); 
  }
  if (obj.amount) {
    serialized.amount = Number(obj.amount); 
  }
  return serialized;
};

// Function to create a new account
export async function CreateAccount(data: { balance: string; isDefault: boolean }) {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
    });
    if (!user) throw new Error("User not found");

    // Convert balance into a float before saving
    const balanceFloat = parseFloat(data.balance);
    if (isNaN(balanceFloat)) {
      throw new Error("Invalid balance amount");
    }

    // Check if this is the user's first/default account
    const existingAccounts = await db.account.findMany({
      where: { userId: user.id },
    });
    const shouldBeDefault = existingAccounts.length === 0 || data.isDefault;

    // If the new account should be default, unset other default accounts
    if (shouldBeDefault) {
      await db.account.updateMany({
        where: { userId: user.id, isDefault: true },
        data: { isDefault: false },
      });
    }
    const account = await db.account.create({
      data: {
        userId: user.id,
        name: "Default Account", // Provide a default value for the name if needed
        ...data,
      },
    });

    const serializedAccount = serializeTransaction(account);
    revalidatePath("/dashboard");
    return { success: true, data: serializedAccount };
  } catch (error: any) {
    console.error("Error creating account:", error.message);
    throw new Error(error.message);
  }
}

export async function getUserAccounts() {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
    });
    if (!user) throw new Error("User not found");

    const accounts = await db.account.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
      include: {
        _count: {
          select: {
            transactions: true,
          },
        },
      },
    });
    const serializedAccounts = accounts.map(serializeTransaction);

    return serializedAccounts;
  } catch (error: any) {
    console.error("Error fetching accounts:", error.message);
    throw new Error(error.message);
  }
}