"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateClientDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_Client_dto_1 = require("./create-Client.dto");
class UpdateClientDto extends (0, swagger_1.PartialType)(create_Client_dto_1.CreateClientDto) {
}
exports.UpdateClientDto = UpdateClientDto;
//# sourceMappingURL=update-Client.dto.js.map