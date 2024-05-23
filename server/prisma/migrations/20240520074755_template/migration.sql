-- CreateEnum
CREATE TYPE "TemplateVersion" AS ENUM ('v1', 'v2', 'v3', 'v4');

-- AlterTable
ALTER TABLE "AdditionalFieldS" ADD COLUMN     "position" INTEGER;

-- AlterTable
ALTER TABLE "Invoices" ADD COLUMN     "templateVersion" "TemplateVersion" DEFAULT 'v1';
