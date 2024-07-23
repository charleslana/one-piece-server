-- CreateEnum
CREATE TYPE "RoleEnum" AS ENUM ('admin', 'user');

-- CreateEnum
CREATE TYPE "FactionEnum" AS ENUM ('pirate', 'marine', 'revolutionary');

-- CreateEnum
CREATE TYPE "SeaEnum" AS ENUM ('north-blue', 'east-blue', 'south-blue', 'west-blue');

-- CreateEnum
CREATE TYPE "BreedEnum" AS ENUM ('human', 'dwarf', 'giant', 'merman', 'cyborg');

-- CreateEnum
CREATE TYPE "CharacterClassEnum" AS ENUM ('swordsman', 'shooter', 'fighter');

-- CreateTable
CREATE TABLE "tb_user" (
    "id" SERIAL NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" TEXT NOT NULL,
    "banned_time" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_character_id" INTEGER,

    CONSTRAINT "tb_user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_user_role" (
    "id" SERIAL NOT NULL,
    "name" "RoleEnum" NOT NULL DEFAULT 'user',
    "user_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tb_user_role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_user_character" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(20),
    "faction" "FactionEnum",
    "sea" "SeaEnum",
    "breed" "BreedEnum",
    "class" "CharacterClassEnum",
    "level" INTEGER NOT NULL DEFAULT 1,
    "coin" INTEGER NOT NULL DEFAULT 5000,
    "gold" INTEGER NOT NULL DEFAULT 0,
    "exp" INTEGER NOT NULL DEFAULT 0,
    "strength" INTEGER NOT NULL DEFAULT 1,
    "defense" INTEGER NOT NULL DEFAULT 1,
    "agility" INTEGER NOT NULL DEFAULT 1,
    "vitality" INTEGER NOT NULL DEFAULT 1,
    "energy" INTEGER NOT NULL DEFAULT 1,
    "stamina" INTEGER NOT NULL DEFAULT 100,
    "attribute_point" INTEGER NOT NULL DEFAULT 5,
    "victory_pve" INTEGER NOT NULL DEFAULT 0,
    "defeat_pve" INTEGER NOT NULL DEFAULT 0,
    "victory_pvp" INTEGER NOT NULL DEFAULT 0,
    "defeat_pvp" INTEGER NOT NULL DEFAULT 0,
    "user_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tb_user_character_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_avatar" (
    "id" SERIAL NOT NULL,
    "image" VARCHAR(255) NOT NULL,
    "user_character_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tb_avatar_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tb_user_email_key" ON "tb_user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "tb_user_character_name_key" ON "tb_user_character"("name");

-- CreateIndex
CREATE UNIQUE INDEX "tb_user_character_user_id_key" ON "tb_user_character"("user_id");

-- AddForeignKey
ALTER TABLE "tb_user" ADD CONSTRAINT "tb_user_user_character_id_fkey" FOREIGN KEY ("user_character_id") REFERENCES "tb_user_character"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_user_role" ADD CONSTRAINT "tb_user_role_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "tb_user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_avatar" ADD CONSTRAINT "tb_avatar_user_character_id_fkey" FOREIGN KEY ("user_character_id") REFERENCES "tb_user_character"("id") ON DELETE CASCADE ON UPDATE CASCADE;
