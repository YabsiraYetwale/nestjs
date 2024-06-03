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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LineItemsController = void 0;
const common_1 = require("@nestjs/common");
const lineItems_service_1 = require("./lineItems.service");
const create_Line_Items_dto_1 = require("../invoices/dto/create-Line-Items.dto");
const update_Line_Items_dto_1 = require("./dto/update-Line-Items.dto");
let LineItemsController = class LineItemsController {
    constructor(lineItemsService) {
        this.lineItemsService = lineItemsService;
    }
    async createCustomField(fields) {
        return this.lineItemsService.createCustomField(fields);
    }
    getCustomField() {
        return this.lineItemsService.getCustomField();
    }
    async getAdditionalFieldsByCompanyId(companyId) {
        return this.lineItemsService.getAdditionalFieldsByCompanyId(companyId);
    }
    deleteCustomField(id) {
        return this.lineItemsService.deleteCustomField(id);
    }
    getAllLineItems() {
        return this.lineItemsService.getAllLineItems();
    }
    getOneInvoice(id) {
        return this.lineItemsService.getOneLineItems(id);
    }
    createLineItems(lineItemsDto) {
        return this.lineItemsService.createLineItems(lineItemsDto);
    }
    updateLineItems(id, updateLineItemsDto) {
        return this.lineItemsService.updateLineItems(id, updateLineItemsDto);
    }
    deleteLineItems(id) {
        return this.lineItemsService.deleteLineItems(id);
    }
};
__decorate([
    (0, common_1.Post)('custom'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], LineItemsController.prototype, "createCustomField", null);
__decorate([
    (0, common_1.Get)('custom'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], LineItemsController.prototype, "getCustomField", null);
__decorate([
    (0, common_1.Get)('custom/:company_id'),
    __param(0, (0, common_1.Param)('company_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], LineItemsController.prototype, "getAdditionalFieldsByCompanyId", null);
__decorate([
    (0, common_1.Delete)('custom/:id'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], LineItemsController.prototype, "deleteCustomField", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], LineItemsController.prototype, "getAllLineItems", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], LineItemsController.prototype, "getOneInvoice", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_Line_Items_dto_1.CreateLineItemsDto]),
    __metadata("design:returntype", void 0)
], LineItemsController.prototype, "createLineItems", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_Line_Items_dto_1.UpdateLineItemsDto]),
    __metadata("design:returntype", void 0)
], LineItemsController.prototype, "updateLineItems", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], LineItemsController.prototype, "deleteLineItems", null);
LineItemsController = __decorate([
    (0, common_1.Controller)('items'),
    __metadata("design:paramtypes", [lineItems_service_1.LineItemsService])
], LineItemsController);
exports.LineItemsController = LineItemsController;
//# sourceMappingURL=lineItems.controller.js.map