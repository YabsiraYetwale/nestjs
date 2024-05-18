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
exports.TemplateVersionController = void 0;
const common_1 = require("@nestjs/common");
const template_version_service_1 = require("./template-version.service");
let TemplateVersionController = class TemplateVersionController {
    constructor(templateVersionService) {
        this.templateVersionService = templateVersionService;
    }
    getTemplateV1(id) {
        return this.templateVersionService.getTemplateVersion(id);
    }
    getTemplateV2(id) {
        return this.templateVersionService.getTemplateVersion(id);
    }
    getTemplateV3(id) {
        return this.templateVersionService.getTemplateVersion(id);
    }
    getTemplateV4(id) {
        return this.templateVersionService.getTemplateVersion(id);
    }
    getTemplateV5(id) {
        return this.templateVersionService.getTemplateVersion(id);
    }
};
__decorate([
    (0, common_1.Get)('v1/:id'),
    (0, common_1.Render)('invoice-template-v1'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TemplateVersionController.prototype, "getTemplateV1", null);
__decorate([
    (0, common_1.Get)('v2/:id'),
    (0, common_1.Render)('invoice-template-v2'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TemplateVersionController.prototype, "getTemplateV2", null);
__decorate([
    (0, common_1.Get)('v3/:id'),
    (0, common_1.Render)('invoice-template-v3'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TemplateVersionController.prototype, "getTemplateV3", null);
__decorate([
    (0, common_1.Get)('v4/:id'),
    (0, common_1.Render)('invoice-template-v4'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TemplateVersionController.prototype, "getTemplateV4", null);
__decorate([
    (0, common_1.Get)('v5/:id'),
    (0, common_1.Render)('invoice-template-v5'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TemplateVersionController.prototype, "getTemplateV5", null);
TemplateVersionController = __decorate([
    (0, common_1.Controller)('templates'),
    __metadata("design:paramtypes", [template_version_service_1.TemplateVersionService])
], TemplateVersionController);
exports.TemplateVersionController = TemplateVersionController;
//# sourceMappingURL=template-version.controller.js.map