-- DropForeignKey
ALTER TABLE "Document" DROP CONSTRAINT "Document_company_id_fkey";

-- AlterTable
ALTER TABLE "Invoices" ADD COLUMN     "creator_id" TEXT;

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invoices" ADD CONSTRAINT "Invoices_creator_id_fkey" FOREIGN KEY ("creator_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
