/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { db } from "@/lib/Prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

const serializeTransaction = (obj: {
  amount?: any;
  balance?: any;
  userId: string;
  name: string;
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

export async function updateDefaultAccount(accountId: string) {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
    });
    if (!user) throw new Error("User not found");

    // First, unset any existing default account
    await db.account.updateMany({
      where: { userId: user.id, isDefault: true },
      data: { isDefault: false },
    });

    // Update the selected account as default
    const account = await db.account.update({
      where: { id: accountId },
      data: { isDefault: true },
    });

    revalidatePath("/dashboard");
    return { success: true, data: serializeTransaction(account) };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
export async function getAccountWithTranscations(accountid:string){
    const {userId} = await auth();
    if(!userId) throw new Error("unauthorized")
    const user = await db.user.findUnique({
     where:{clerkUserId:userId}
})    
    if(!user) throw new Error("user not found");

    const account = await db.account.findUnique({
        where:{ id:accountid, userId: user.id},
        include:{
            transactions:{
                orderBy:{date:"desc"}
            },
            _count:{
                select:{transactions:true}
            },
        },
    });

    if(!account) return null;
    return{
        ...serializeTransaction(account),
        transactions : account.transactions.map(serializeTransaction)
    }
}