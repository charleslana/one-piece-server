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
    "name" VARCHAR(20),
    "faction" "FactionEnum",
    "sea" "SeaEnum",
    "breed" "BreedEnum",
    "character_class" "CharacterClassEnum",
    "level" INTEGER NOT NULL DEFAULT 1,
    "coin" INTEGER NOT NULL DEFAULT 5000,
    "gold" INTEGER NOT NULL DEFAULT 0,
    "exp" INTEGER NOT NULL DEFAULT 0,
    "stamina" INTEGER NOT NULL DEFAULT 100,
    "victory_pve" INTEGER NOT NULL DEFAULT 0,
    "defeat_pve" INTEGER NOT NULL DEFAULT 0,
    "victory_pvp" INTEGER NOT NULL DEFAULT 0,
    "defeat_pvp" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

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
CREATE TABLE "tb_user_attribute" (
    "id" SERIAL NOT NULL,
    "strength" INTEGER NOT NULL DEFAULT 1,
    "defense" INTEGER NOT NULL DEFAULT 1,
    "agility" INTEGER NOT NULL DEFAULT 1,
    "vitality" INTEGER NOT NULL DEFAULT 1,
    "energy" INTEGER NOT NULL DEFAULT 1,
    "attribute_point" INTEGER NOT NULL DEFAULT 5,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "tb_user_attribute_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_user_avatar" (
    "id" SERIAL NOT NULL,
    "image" VARCHAR(255) NOT NULL,
    "selected" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "tb_user_avatar_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tb_user_email_key" ON "tb_user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "tb_user_name_key" ON "tb_user"("name");

-- CreateIndex
CREATE UNIQUE INDEX "tb_user_attribute_user_id_key" ON "tb_user_attribute"("user_id");

-- AddForeignKey
ALTER TABLE "tb_user_role" ADD CONSTRAINT "tb_user_role_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "tb_user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_user_attribute" ADD CONSTRAINT "tb_user_attribute_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "tb_user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_user_avatar" ADD CONSTRAINT "tb_user_avatar_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "tb_user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
