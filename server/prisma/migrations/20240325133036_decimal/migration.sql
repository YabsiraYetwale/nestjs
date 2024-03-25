/*
  Warnings:

  - You are about to alter the column `total_amount` on the `Invoices` table. The data in that column could be lost. The data in that column will be cast from `Integer` to `Decimal(10,2)`.
  - You are about to alter the column `unit_price` on the `Line_Items` table. The data in that column could be lost. The data in that column will be cast from `Integer` to `Decimal(10,2)`.
  - You are about to alter the column `tax_rate` on the `Line_Items` table. The data in that column could be lost. The data in that column will be cast from `Integer` to `Decimal(5,2)`.

*/
-- AlterTable
ALTER TABLE "Invoices" ALTER COLUMN "date" DROP DEFAULT,
ALTER COLUMN "due_date" DROP DEFAULT,
ALTER COLUMN "total_amount" SET DATA TYPE DECIMAL(10,2);

-- AlterTable
ALTER TABLE "Line_Items" ALTER COLUMN "unit_price" SET DATA TYPE DECIMAL(10,2),
ALTER COLUMN "tax_rate" SET DATA TYPE DECIMAL(5,2);
