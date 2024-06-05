-- AlterTable
ALTER TABLE "Invoices" ADD COLUMN     "recipient_company_id" TEXT;

-- AddForeignKey
ALTER TABLE "Invoices" ADD CONSTRAINT "Invoices_recipient_company_id_fkey" FOREIGN KEY ("recipient_company_id") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;
