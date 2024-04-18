-- AlterTable
ALTER TABLE "User" ADD COLUMN     "company_id" TEXT;

-- CreateTable
CREATE TABLE "Company" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "company_number" TEXT NOT NULL,
    "vat_reg_number" TEXT NOT NULL,
    "tel1" TEXT NOT NULL,
    "tel2" TEXT NOT NULL,
    "subcity" TEXT NOT NULL,
    "kebele" TEXT NOT NULL,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Company_name_key" ON "Company"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Company_company_number_key" ON "Company"("company_number");

-- CreateIndex
CREATE UNIQUE INDEX "Company_vat_reg_number_key" ON "Company"("vat_reg_number");

-- CreateIndex
CREATE UNIQUE INDEX "Company_tel1_key" ON "Company"("tel1");

-- CreateIndex
CREATE UNIQUE INDEX "Company_tel2_key" ON "Company"("tel2");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;
