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
exports.ClientsController = void 0;
const common_1 = require("@nestjs/common");
const clients_service_1 = require("./clients.service");
const create_Client_dto_1 = require("./dto/create-Client.dto");
const update_Client_dto_1 = require("./dto/update-Client.dto");
const permission_1 = require("../decorators/permission");
const permission_guard_1 = require("../auth/guard/permission.guard");
const at_guard_1 = require("../auth/guard/at.guard");
let ClientsController = class ClientsController {
    constructor(clientsService) {
        this.clientsService = clientsService;
    }
    async getAllClients(searchQuery, query) {
        return this.clientsService.getAllClients(searchQuery, query);
    }
    getOneClient(id) {
        return this.clientsService.getOneClient(id);
    }
    createClient(createClientDto) {
        return this.clientsService.createClient(createClientDto);
    }
    updateClient(id, updateClientDto) {
        return this.clientsService.updateClient(id, updateClientDto);
    }
    deleteClient(id) {
        return this.clientsService.deleteClient(id);
    }
};
__decorate([
    (0, permission_1.RequiredPermission)('can_read_clients'),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('searchQuery')),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ClientsController.prototype, "getAllClients", null);
__decorate([
    (0, permission_1.RequiredPermission)('can_read_client'),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ClientsController.prototype, "getOneClient", null);
__decorate([
    (0, permission_1.RequiredPermission)('can_create_client'),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_Client_dto_1.CreateClientDto]),
    __metadata("design:returntype", void 0)
], ClientsController.prototype, "createClient", null);
__decorate([
    (0, permission_1.RequiredPermission)('can_update_client'),
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_Client_dto_1.UpdateClientDto]),
    __metadata("design:returntype", void 0)
], ClientsController.prototype, "updateClient", null);
__decorate([
    (0, permission_1.RequiredPermission)('can_delete_client'),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ClientsController.prototype, "deleteClient", null);
ClientsController = __decorate([
    (0, common_1.UseGuards)(at_guard_1.AtGuards, permission_guard_1.PermissionGuard),
    (0, common_1.Controller)('clients'),
    __metadata("design:paramtypes", [clients_service_1.ClientsService])
], ClientsController);
exports.ClientsController = ClientsController;
//# sourceMappingURL=clients.controller.js.map