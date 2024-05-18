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
exports.LineItemsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let LineItemsService = class LineItemsService {
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async createCustomField(additional_fields) {
        return this.prismaService.AdditionalFieldS.create({ data: additional_fields });
    }
    async getCustomField() {
        const additional_fields = await this.prismaService.AdditionalFieldS.findMany();
        return { additional_fields };
    }
    async getAdditionalFieldsByCompanyId(companyId) {
        const additionalFields = await this.prismaService.AdditionalFieldS.findMany({
            where: {
                company_id: companyId,
            },
        });
        return { additionalFields };
    }
    async deleteCustomField(id) {
        const existingCustomFieds = await this.prismaService.AdditionalFieldS.findUnique({ where: id });
        if (!existingCustomFieds) {
            throw new common_1.HttpException("customFieds doesn't exist", 404);
        }
        const deletedCustomFieds = await this.prismaService.AdditionalFieldS.delete({ where: id });
        if (!deletedCustomFieds) {
            throw new Error("Failed to delete CustomFieds");
        }
        else {
            return { message: "CustomFieds deleted successfully" };
        }
    }
    async getAllLineItems() {
        const allLine_Items = await this.prismaService.Line_Items.findMany();
        return { allLine_Items };
    }
    async getOneLineItems(id) {
        const lineItems = await this.prismaService.Line_Items.findUnique({ where: id });
        if (!lineItems) {
            throw new common_1.HttpException("LineItems doesn't exist", 404);
        }
        else {
            return { lineItems };
        }
    }
    async updateLineItems(id, updateLineItemsDto) {
        const post = updateLineItemsDto;
        const existingLineItems = await this.prismaService.Line_Items.findUnique({ where: id });
        if (!existingLineItems) {
            throw new common_1.HttpException("LineItems doesn't exist", 404);
        }
        const updatedLineItems = await this.prismaService.Line_Items.update({ where: id, data: Object.assign({}, post) });
        if (!updatedLineItems) {
            throw new Error("Failed to update LineItems");
        }
        return Object.assign({}, updatedLineItems);
    }
    async deleteLineItems(id) {
        const existingLineItems = await this.prismaService.Line_Items.findUnique({ where: id });
        if (!existingLineItems) {
            throw new common_1.HttpException("LineItems doesn't exist", 404);
        }
        const deletedLineItems = await this.prismaService.Line_Items.delete({ where: id });
        if (!deletedLineItems) {
            throw new Error("Failed to delete LineItems");
        }
        else {
            return { message: "LineItems deleted successfully" };
        }
    }
    async createLineItems(createLineItemsDto) {
        const { lineItems } = createLineItemsDto;
        const newLineItems = await Promise.all(lineItems.map(async (item) => {
            const { description, quantity, unit_price, tax_rate, invoice_id } = item;
            return this.prismaService.Line_Items.create({
                data: {
                    description,
                    quantity,
                    unit_price,
                    tax_rate,
                    invoice_id,
                },
            });
        }));
        return newLineItems;
    }
};
LineItemsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], LineItemsService);
exports.LineItemsService = LineItemsService;
//# sourceMappingURL=lineItems.service.js.map