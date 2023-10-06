-- CreateTable
CREATE TABLE "Token" (
    "id" SERIAL NOT NULL,
    "data" JSONB NOT NULL,

    CONSTRAINT "Token_pkey" PRIMARY KEY ("id")
);
