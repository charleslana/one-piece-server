-- CreateTable
CREATE TABLE "tb_user_message" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(100) NOT NULL,
    "description" VARCHAR(1000) NOT NULL,
    "is_read" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" INTEGER NOT NULL,
    "sender_id" INTEGER,

    CONSTRAINT "tb_user_message_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "tb_user_message" ADD CONSTRAINT "tb_user_message_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "tb_user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_user_message" ADD CONSTRAINT "tb_user_message_sender_id_fkey" FOREIGN KEY ("sender_id") REFERENCES "tb_user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
