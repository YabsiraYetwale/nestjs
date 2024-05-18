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
exports.ClientsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let ClientsService = class ClientsService {
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async getAllClients(searchQuery, query) {
        let whereCondition = {};
        if (searchQuery) {
            const caseInsensitiveSearchQuery = searchQuery.toLowerCase();
            whereCondition = {
                OR: [
                    {
                        name: {
                            contains: caseInsensitiveSearchQuery,
                            mode: "insensitive",
                        },
                    },
                    {
                        billing_address: {
                            contains: caseInsensitiveSearchQuery,
                            mode: "insensitive",
                        },
                    },
                    {
                        contact_person: {
                            contains: caseInsensitiveSearchQuery,
                            mode: "insensitive",
                        },
                    },
                    {
                        email: {
                            contains: caseInsensitiveSearchQuery,
                            mode: "insensitive",
                        },
                    },
                    {
                        phone: {
                            contains: caseInsensitiveSearchQuery,
                            mode: "insensitive",
                        },
                    },
                    {
                        shipping_address: {
                            contains: caseInsensitiveSearchQuery,
                            mode: "insensitive",
                        },
                    },
                    {
                        shipping_city: {
                            contains: caseInsensitiveSearchQuery,
                            mode: "insensitive",
                        },
                    },
                    {
                        shipping_zip: {
                            contains: caseInsensitiveSearchQuery,
                            mode: "insensitive",
                        },
                    },
                    {
                        shipping_state: {
                            contains: caseInsensitiveSearchQuery,
                            mode: "insensitive",
                        },
                    },
                    {
                        shipping_country: {
                            contains: caseInsensitiveSearchQuery,
                            mode: "insensitive",
                        },
                    },
                ],
            };
        }
        const clients = await this.prismaService.Clients.findMany({
            where: whereCondition,
            include: { invoices: true },
        });
        if (!searchQuery) {
            return clients;
        }
        return clients.length > 0 ? clients : 'No matching clients found.';
    }
    async getOneClient(id) {
        const client = await this.prismaService.Clients.findUnique({
            where: id, include: { invoices: true }
        });
        if (!client) {
            throw new common_1.HttpException("Client doesn't exist", 404);
        }
        else {
            return { client };
        }
    }
    async createClient(createClientDto) {
        const post = createClientDto;
        const newClient = await this.prismaService.Clients.create({ data: Object.assign({}, post) });
        return Object.assign({}, newClient);
    }
    async updateClient(id, updateClientDto) {
        const post = updateClientDto;
        const existingClient = await this.prismaService.Clients.findUnique({ where: id });
        if (!existingClient) {
            throw new common_1.HttpException("Client doesn't exist", 404);
        }
        const updatedClient = await this.prismaService.Clients.update({ where: id, data: Object.assign({}, post) });
        if (!updatedClient) {
            throw new Error("Failed to update client");
        }
        return Object.assign({}, updatedClient);
    }
    async deleteClient(id) {
        const existingClient = await this.prismaService.Clients.findUnique({ where: id });
        if (!existingClient) {
            throw new common_1.HttpException("Client doesn't exist", 404);
        }
        const deletedClient = await this.prismaService.Clients.delete({ where: id });
        if (!deletedClient) {
            throw new Error("Failed to delete client");
        }
        else {
            return { message: "Client deleted successfully" };
        }
    }
};
ClientsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ClientsService);
exports.ClientsService = ClientsService;
//# sourceMappingURL=clients.service.js.map