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
exports.UpdateCompanyDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const registration_dto_1 = require("../../auth/dto/registration.dto");
const create_company_dto_1 = require("./create-company.dto");
class UpdateCompanyDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'URL of the company logo',
        example: 'https://example.com/logo.png',
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateCompanyDto.prototype, "company_logo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The name of the company',
        example: 'Acme Corporation',
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateCompanyDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Name of the general manager',
        example: 'John Doe',
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateCompanyDto.prototype, "general_manager_name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Company registration number',
        example: '1234567890',
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateCompanyDto.prototype, "company_number", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'VAT registration number',
        example: 'VAT123456789',
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateCompanyDto.prototype, "vat_reg_number", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'House number of the company address',
        example: '1234',
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateCompanyDto.prototype, "house_no", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'PO Box number of the company',
        example: 'PO Box 5678',
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateCompanyDto.prototype, "po_box", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Fax number of the company',
        example: '+123456789',
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateCompanyDto.prototype, "fax", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Email address of the company',
        example: 'info@example.com',
    }),
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateCompanyDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Primary telephone number of the company',
        example: '+123456789',
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateCompanyDto.prototype, "tel1", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Secondary telephone number of the company',
        example: '+987654321',
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateCompanyDto.prototype, "tel2", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Country where the company is located',
        example: 'USA',
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateCompanyDto.prototype, "country", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Region where the company is located',
        example: 'California',
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateCompanyDto.prototype, "region", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'City where the company is located',
        example: 'Los Angeles',
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateCompanyDto.prototype, "city", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Subcity where the company is located',
        example: 'Hollywood',
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateCompanyDto.prototype, "subcity", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Woreda where the company is located',
        example: 'Woreda 1',
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateCompanyDto.prototype, "woreda", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Kebele where the company is located',
        example: 'Kebele 15',
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateCompanyDto.prototype, "kebele", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Description of the company',
        example: 'A leading company in the tech industry.',
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateCompanyDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Any additional fields related to the company',
        example: {},
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], UpdateCompanyDto.prototype, "additional_fields", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'List of users associated with the company',
        type: [registration_dto_1.RegistrationUserDto],
    }),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => registration_dto_1.RegistrationUserDto),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], UpdateCompanyDto.prototype, "users", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'List of documents related to the company',
        type: [create_company_dto_1.DocumentDto],
    }),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => create_company_dto_1.DocumentDto),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], UpdateCompanyDto.prototype, "documents", void 0);
exports.UpdateCompanyDto = UpdateCompanyDto;
//# sourceMappingURL=update-company.dto.js.map