/*
  Warnings:

  - You are about to drop the `types` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `isRepost` to the `posts` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "posts" DROP CONSTRAINT "posts_type_fkey";

-- AlterTable
ALTER TABLE "posts" ADD COLUMN     "isRepost" BOOLEAN NOT NULL,
ADD COLUMN     "publish_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- DropTable
DROP TABLE "types";
