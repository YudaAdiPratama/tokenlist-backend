-- CreateTable
CREATE TABLE "TokenList" (
    "id" SERIAL NOT NULL,
    "symbol" TEXT NOT NULL,
    "precision" INTEGER NOT NULL,
    "contract" TEXT NOT NULL,

    CONSTRAINT "TokenList_pkey" PRIMARY KEY ("id")
);
