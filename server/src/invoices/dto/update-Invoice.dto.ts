import { PartialType } from "@nestjs/swagger";
import { CreateInvoiceDto } from "./create-Invoice.dto";

export class UpdateInvoiceDto extends PartialType(CreateInvoiceDto) {}