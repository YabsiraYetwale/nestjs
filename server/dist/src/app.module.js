"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const auth_module_1 = require("./auth/auth.module");
const clients_module_1 = require("./clients/clients.module");
const prisma_module_1 = require("../prisma/prisma.module");
const invoices_module_1 = require("./invoices/invoices.module");
const invoices_Status_module_1 = require("./invoices/status/invoices-Status.module");
const notifications_module_1 = require("./notifications/notifications.module");
const companies_module_1 = require("./companies/companies.module");
const template_version_module_1 = require("./template-version/template-version.module");
const platform_express_1 = require("@nestjs/platform-express");
const app_controller_1 = require("./app.controller");
const serve_static_1 = require("@nestjs/serve-static");
const user_module_1 = require("./user/user.module");
const role_module_1 = require("./role/role.module");
const permission_module_1 = require("./permission/permission.module");
const user_role_module_1 = require("./user-role/user-role.module");
const user_permission_module_1 = require("./user-permission/user-permission.module");
const mailer_module_1 = require("./mailer/mailer.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            auth_module_1.AuthModule,
            clients_module_1.ClientsModule,
            invoices_module_1.InvoicesModule,
            invoices_Status_module_1.InvoicesStatusModule,
            prisma_module_1.PrismaModule,
            notifications_module_1.NotificationsModule,
            companies_module_1.CompaniesModule,
            mailer_module_1.MailerModule,
            template_version_module_1.TemplateVersionModule,
            user_module_1.UserModule,
            role_module_1.RoleModule,
            permission_module_1.PermissionModule,
            user_role_module_1.UserRoleModule,
            user_permission_module_1.UserPermissionModule,
            platform_express_1.MulterModule.register({ dest: './uploads' }),
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: `${process.cwd()}/uploads`,
            }),
        ],
        controllers: [app_controller_1.AppController],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map