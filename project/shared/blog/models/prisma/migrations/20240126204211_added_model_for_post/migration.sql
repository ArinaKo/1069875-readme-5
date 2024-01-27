-- CreateTable
CREATE TABLE "posts" (
    "id" TEXT NOT NULL,
    "title" TEXT,
    "description" TEXT,
    "content" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "user_id" TEXT NOT NULL,
    "original_id" TEXT,

    CONSTRAINT "posts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "posts_original_id_key" ON "posts"("original_id");

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_original_id_fkey" FOREIGN KEY ("original_id") REFERENCES "posts"("id") ON DELETE SET NULL ON UPDATE CASCADE;
