/* eslint-disable @typescript-eslint/no-explicit-any */
import { db } from "@/lib/Prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

const serializeTransaction = (obj: {
    amount: any; balance: any; userId: string; name: string; id: string; createdAt: Date; updatedAt: Date; type: string; isDefault: boolean; 
})=>{
    const serialized = {...obj};
    if(obj.balance){
        serialized.balance= obj.balance.toNumber();
    }
    if(obj.amount){
        serialized.amount= obj.amount.toNumber();
    }
    return serialized;
}

export async function CreateAccount(data: { balance: string; isDefault: any; }) {
    try {
        const {userId} = await auth();
        if(!userId) throw new Error("unauthorized");

        const user = await db.user.findUnique({
            where: { clerkUserId:userId}
        })
        if(!user) throw new Error("user not found");


        // converting balance into flaot before saving
        const balanceFloat = parseFloat(data.balance)
        if(isNaN(balanceFloat)){
            throw new Error("invalid balance amount")
        }
        //check if this is the users frist/default account
        const existingAccounts = await db.account.findMany({
            where:{userId:user.id}
        })
        const shouldBeDefault = existingAccounts.length===0 ? true :data.isDefault;
        if(shouldBeDefault){
            await db.account.updateMany({
                where:{userId:user.id,isDefault:true},
                data:{isDefault:false}
            })
        }

        const account = await db.account.create({
            data:{
                ...data,
                balance:balanceFloat,
                userId:user.id,
                isDefault:shouldBeDefault,
            },
        })
        const serializedAccount= serializeTransaction(account);
        revalidatePath("/dasboard");
        return { success : true, data:serializedAccount};
    } catch (error : any) {
        throw new Error(error.message)
    }
}
export async function getUserAccounts() {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");
  
    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
    });
  
    if (!user) {
      throw new Error("User not found");
    }
  
    try {
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
  
      // Serialize accounts before sending to client
      const serializedAccounts = accounts.map(serializeTransaction);
  
      return serializedAccounts;
    } catch (error :any) {
      console.error(error.message);
    }
  }