import { db } from "@/lib/Prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

// Define the AccountType interface based on the Prisma schema
interface AccountType {
  id: string;
  name: string;
  type: string;
  balance: number; // Decimals are handled as numbers in JavaScript
  isDefault: boolean;
  userId: string;
  user: {
    id: string; // The User type is inferred here
    clerkUserId: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
  };
  transactions: Array<{
    id: string;
    amount: number;
    createdAt: Date;
    accountId: string;
  }>; // Define `Transaction` type if necessary
  createdAt: Date;
  updatedAt: Date;
}

// Utility function to serialize transactions
const serializeTransactions = (obj: Partial<AccountType>) => {
    const serialized = { ...obj };
    if (obj.balance instanceof Decimal) {
      serialized.balance = obj.balance.toNumber(); // Convert Decimal to number
    }
    return serialized;
  };

// Main function to get account with transactions
export async function getAccountWithTransactions(data: {
  name: string;
  type: string;
  balance: string;
  isDefault: boolean;
}) {
  try {
    // Authenticate user
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    // Get the user from the database
    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
    });
    if (!user) throw new Error("Unauthorized");

    // Convert balance to a number and validate
    const balanceFloat = parseFloat(data.balance);
    if (isNaN(balanceFloat)) {
      throw new Error("Invalid balance amount");
    }

    // Check if it's the first account for this user
    const existingAccounts = await db.account.findMany({
      where: { userId: user.id },
    });
    const shouldBeDefault = existingAccounts.length === 0 ? true : data.isDefault;

    // Unset all other accounts' defaults if this one is default
    if (shouldBeDefault) {
      await db.account.updateMany({
        where: { userId: user.id, isDefault: true },
        data: { isDefault: false },
      });
    }

    // Create the new account
    const account = await db.account.create({
      data: {
        name: data.name,
        type: data.type,
        balance: balanceFloat,
        isDefault: shouldBeDefault,
        userId: user.id,
      },
    });

    // Serialize account and revalidate path
    const serializedAccount = serializeTransactions(account);
    revalidatePath("/dashboard");

    return { success: true, data: serializedAccount };
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error("An unknown error occurred.");
    }
    return null; // Return null in case of error
  }
}