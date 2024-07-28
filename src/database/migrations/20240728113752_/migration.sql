-- CreateTable
CREATE TABLE "tb_newspaper" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "description" VARCHAR(1000) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tb_newspaper_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_user_newspaper" (
    "id" SERIAL NOT NULL,
    "like" BOOLEAN NOT NULL,
    "user_id" INTEGER NOT NULL,
    "newspaper_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tb_user_newspaper_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "tb_user_newspaper" ADD CONSTRAINT "tb_user_newspaper_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "tb_user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_user_newspaper" ADD CONSTRAINT "tb_user_newspaper_newspaper_id_fkey" FOREIGN KEY ("newspaper_id") REFERENCES "tb_newspaper"("id") ON DELETE CASCADE ON UPDATE CASCADE;
