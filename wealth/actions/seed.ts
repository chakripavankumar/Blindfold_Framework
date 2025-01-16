/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { db } from "@/lib/Prisma";
import { subDays } from "date-fns";

const ACCOUNT_ID = "a7843b9b-0b6a-44d5-beda-4ca6a02b665b";
const USER_ID = "ffb16ddd-f2f6-4f05-a2e6-b148b2aa51ce";

// Category type
type Category = {
  name: string;
  range: [number, number];
};

// Transaction type
type TransactionData = {
  id: string;
  type: "INCOME" | "EXPENSE";
  amount: number;
  description: string;
  date: Date;
  category: string;
  status: "COMPLETED";
  userId: string;
  accountId: string;
  createdAt: Date;
  updatedAt: Date;
  recurringInterval?: string; 
};

// Categories with their typical amount ranges
const CATEGORIES: Record<"INCOME" | "EXPENSE", Category[]> = {
  INCOME: [
    { name: "salary", range: [6000, 9000] },
    { name: "freelance", range: [1000, 3000] },
    { name: "investments", range: [1000, 3000] },
    { name: "other-income", range: [100, 1000] },
  ],
  EXPENSE: [
    { name: "housing", range: [3000, 5000] },
    { name: "transportation", range: [1000, 3000] },
    { name: "groceries", range: [2000, 6000] },
    { name: "utilities", range: [1000, 3000] },
    { name: "entertainment", range: [500, 2000] },
    { name: "food", range: [500, 1500] },
    { name: "shopping", range: [1000, 5000] },
    { name: "healthcare", range: [1000, 10000] },
    { name: "education", range: [200, 1000] },
    { name: "travel", range: [500, 2000] },
  ],
};

// Helper to generate random amount within a range
function getRandomAmount(min: number, max: number): number {
  return Number((Math.random() * (max - min) + min).toFixed(2));
}

// Helper to get random category with amount
function getRandomCategory(type: "INCOME" | "EXPENSE"): { category: string; amount: number } {
  const categories = CATEGORIES[type];
  const category = categories[Math.floor(Math.random() * categories.length)];
  const amount = getRandomAmount(category.range[0], category.range[1]);
  return { category: category.name, amount };
}

// Seed Transactions Function
export async function seedTransactions(): Promise<{ success: boolean; message?: string; error?: string }> {
  try {
    // Generate 90 days of transactions
    const transactions: TransactionData[] = [];
    let totalBalance = 0;

    for (let i = 30; i >= 0; i--) {
      const date = subDays(new Date(), i);

      // Generate 1-3 transactions per day
      const transactionsPerDay = Math.floor(Math.random() * 2) + 1;

      for (let j = 0; j < transactionsPerDay; j++) {
        // 50% chance of income, 60% chance of expense
        const type: "INCOME" | "EXPENSE" = Math.random() < 0.4 ? "INCOME" : "EXPENSE";
        const { category, amount } = getRandomCategory(type);

        const transaction: TransactionData = {
          id: crypto.randomUUID(),
          type,
          amount,
          description: `${type === "INCOME" ? "Received" : "Paid for"} ${category}`,
          date,
          category,
          status: "COMPLETED",
          userId: USER_ID,
          accountId: ACCOUNT_ID,
          createdAt: date,
          updatedAt: date,
          recurringInterval: type === "EXPENSE" ? "MONTHLY" : undefined, 
        };

        totalBalance += type === "INCOME" ? amount : -amount;
        transactions.push(transaction);
      }
    }

    // Insert transactions in batches and update account balance
    await db.$transaction(async (tx) => {
      // Clear existing transactions
      await tx.transactions.deleteMany({
        where: { accountId: ACCOUNT_ID },
      });

      // Insert new transactions
      const BATCH_SIZE = 500; // Customize based on performance
      for (let i = 0; i < transactions.length; i += BATCH_SIZE) {
        const batch = transactions.slice(i, i + BATCH_SIZE);
        await db.transactions.createMany({
          data: batch,
        });
      }

      // Update account balance
      await tx.account.update({
        where: { id: ACCOUNT_ID },
        data: { balance: totalBalance },
      });
    });

    return {
      success: true,
      message: `Created ${transactions.length} transactions`,
    };
  } catch (error: any) {
    console.error("Error message is: " + error.message);
    return { success: false, error: error.message };
  }
}