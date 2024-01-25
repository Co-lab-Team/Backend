/*
  Warnings:

  - Added the required column `templateURL` to the `Template` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Template" ADD COLUMN     "compactible" "Compactibility" NOT NULL DEFAULT 'Figma',
ADD COLUMN     "tags" TEXT[],
ADD COLUMN     "templateURL" TEXT NOT NULL,
ALTER COLUMN "isPublic" SET DEFAULT true;
