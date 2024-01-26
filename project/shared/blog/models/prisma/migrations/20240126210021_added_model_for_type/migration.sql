/*
  Warnings:

  - Added the required column `type` to the `posts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "posts" ADD COLUMN     "type" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "types" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "types_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "types_title_key" ON "types"("title");

-- CreateIndex
CREATE INDEX "types_title_idx" ON "types"("title");

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_type_fkey" FOREIGN KEY ("type") REFERENCES "types"("title") ON DELETE RESTRICT ON UPDATE CASCADE;
