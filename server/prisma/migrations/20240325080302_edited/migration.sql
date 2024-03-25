/*
  Warnings:

  - Added the required column `invoice_id` to the `Line_Items` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Invoices" DROP CONSTRAINT "Invoices_client_id_fkey";

-- AlterTable
ALTER TABLE "Invoices" ALTER COLUMN "date" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "due_date" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Line_Items" ADD COLUMN     "invoice_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Invoices" ADD CONSTRAINT "Invoices_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "Clients"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Line_Items" ADD CONSTRAINT "Line_Items_invoice_id_fkey" FOREIGN KEY ("invoice_id") REFERENCES "Invoices"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
