-- AlterTable
ALTER TABLE "Invoices" ADD COLUMN     "company_id" TEXT;

-- AddForeignKey
ALTER TABLE "Invoices" ADD CONSTRAINT "Invoices_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;
