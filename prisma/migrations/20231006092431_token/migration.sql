/*
  Warnings:

  - The primary key for the `TokenList` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `TokenList` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[symbol,precision,contract]` on the table `TokenList` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "TokenList" DROP CONSTRAINT "TokenList_pkey",
DROP COLUMN "id";

-- CreateIndex
CREATE UNIQUE INDEX "TokenList_symbol_precision_contract_key" ON "TokenList"("symbol", "precision", "contract");
