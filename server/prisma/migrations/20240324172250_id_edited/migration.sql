-- DropForeignKey
ALTER TABLE "Line_Items" DROP CONSTRAINT "Line_Items_invoice_id_fkey";

-- AlterTable
ALTER TABLE "Line_Items" ALTER COLUMN "invoice_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Line_Items" ADD CONSTRAINT "Line_Items_invoice_id_fkey" FOREIGN KEY ("invoice_id") REFERENCES "Invoices"("id") ON DELETE SET NULL ON UPDATE CASCADE;
