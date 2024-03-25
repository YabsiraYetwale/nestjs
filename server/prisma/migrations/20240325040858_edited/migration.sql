/*
  Warnings:

  - You are about to drop the column `invoice_id` on the `Line_Items` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Line_Items" DROP CONSTRAINT "Line_Items_invoice_id_fkey";

-- AlterTable
ALTER TABLE "Line_Items" DROP COLUMN "invoice_id";
