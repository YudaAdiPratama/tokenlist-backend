/*
  Warnings:

  - A unique constraint covering the columns `[symbol,contract]` on the table `TokenList` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "TokenList_symbol_precision_contract_key";

-- CreateIndex
CREATE UNIQUE INDEX "TokenList_symbol_contract_key" ON "TokenList"("symbol", "contract");
