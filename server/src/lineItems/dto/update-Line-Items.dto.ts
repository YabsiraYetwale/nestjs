import { PartialType } from "@nestjs/swagger";
import { CreateLineItemsDto } from "./create-Line-Items.dto";

export class UpdateLineItemsDto extends PartialType(CreateLineItemsDto) {}
