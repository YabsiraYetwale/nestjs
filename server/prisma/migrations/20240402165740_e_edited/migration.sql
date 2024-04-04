-- DropForeignKey
ALTER TABLE "Line_Items" DROP CONSTRAINT "Line_Items_invoice_id_fkey";

-- AddForeignKey
ALTER TABLE "Line_Items" ADD CONSTRAINT "Line_Items_invoice_id_fkey" FOREIGN KEY ("invoice_id") REFERENCES "Invoices"("invoice_number") ON DELETE CASCADE ON UPDATE CASCADE;
