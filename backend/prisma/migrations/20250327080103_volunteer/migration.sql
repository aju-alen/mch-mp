/*
  Warnings:

  - You are about to drop the column `messageBody` on the `UserVolunteer` table. All the data in the column will be lost.
  - Added the required column `message` to the `UserVolunteer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `privacyPolicy` to the `UserVolunteer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `UserVolunteer` DROP COLUMN `messageBody`,
    ADD COLUMN `message` VARCHAR(191) NOT NULL,
    ADD COLUMN `privacyPolicy` BOOLEAN NOT NULL;
