-- DropForeignKey
ALTER TABLE "tb_user" DROP CONSTRAINT "tb_user_user_character_id_fkey";

-- AddForeignKey
ALTER TABLE "tb_user_character" ADD CONSTRAINT "tb_user_character_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "tb_user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
