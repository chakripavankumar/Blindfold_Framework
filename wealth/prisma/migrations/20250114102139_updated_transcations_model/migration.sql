/*
  Warnings:

  - You are about to drop the column `recurringInterval` on the `accounts` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "accounts" DROP COLUMN "recurringInterval";

-- AlterTable
ALTER TABLE "transactions" ALTER COLUMN "recurringInterval" DROP NOT NULL;
