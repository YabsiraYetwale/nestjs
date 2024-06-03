"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateInvoiceDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const create_Line_Items_dto_1 = require("./create-Line-Items.dto");
const class_transformer_1 = require("class-transformer");
const create_Client_dto_1 = require("../../clients/dto/create-Client.dto");
class CreateInvoiceDto {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsEmpty)(),
    __metadata("design:type", String)
], CreateInvoiceDto.prototype, "invoice_number", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsEmpty)(),
    __metadata("design:type", Boolean)
], CreateInvoiceDto.prototype, "isRead", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateInvoiceDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsEmpty)(),
    __metadata("design:type", Date)
], CreateInvoiceDto.prototype, "date", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", Date)
], CreateInvoiceDto.prototype, "due_date", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], CreateInvoiceDto.prototype, "total_amount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsEmpty)(),
    __metadata("design:type", String)
], CreateInvoiceDto.prototype, "creator_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsEmpty)(),
    __metadata("design:type", String)
], CreateInvoiceDto.prototype, "company_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsEmpty)(),
    __metadata("design:type", Object)
], CreateInvoiceDto.prototype, "creator", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsEmpty)(),
    __metadata("design:type", Object)
], CreateInvoiceDto.prototype, "company", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateInvoiceDto.prototype, "templateVersion", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [create_Line_Items_dto_1.CreateLineItemDto] }),
    (0, class_validator_1.ArrayNotEmpty)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => create_Line_Items_dto_1.CreateLineItemDto),
    __metadata("design:type", Array)
], CreateInvoiceDto.prototype, "line_items", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [create_Client_dto_1.CreateClientDto] }),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => create_Client_dto_1.CreateClientDto),
    __metadata("design:type", create_Client_dto_1.CreateClientDto)
], CreateInvoiceDto.prototype, "client", void 0);
exports.CreateInvoiceDto = CreateInvoiceDto;
//# sourceMappingURL=create-Invoice.dto.js.map