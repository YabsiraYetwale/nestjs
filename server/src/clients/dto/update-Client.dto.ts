import { PartialType } from "@nestjs/swagger";
import { CreateClientDto } from "./create-Client.dto";

export class UpdateClientDto extends PartialType(CreateClientDto) {}
