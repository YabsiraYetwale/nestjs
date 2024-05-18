"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateInvoiceDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_Invoice_dto_1 = require("./create-Invoice.dto");
class UpdateInvoiceDto extends (0, swagger_1.PartialType)(create_Invoice_dto_1.CreateInvoiceDto) {
}
exports.UpdateInvoiceDto = UpdateInvoiceDto;
//# sourceMappingURL=update-Invoice.dto.js.map