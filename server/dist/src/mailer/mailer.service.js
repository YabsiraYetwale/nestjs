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
exports.MailerService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const nodemailer = require("nodemailer");
let MailerService = class MailerService {
    constructor(configService) {
        this.configService = configService;
    }
    mailTransport() {
        const transporter = nodemailer.createTransport({
            service: this.configService.get('SMTP_SERVICE'),
            host: this.configService.get('SMTP_HOST'),
            port: this.configService.get('SMTP_PORT'),
            secure: false,
            auth: {
                user: this.configService.get('SMTP_MAIL'),
                pass: this.configService.get('SMTP_PASS'),
            },
        });
        return transporter;
    }
    async sendMailer(dto) {
        const transporter = this.mailTransport();
        const mailerOptions = {
            from: {
                name: 'Yabsira Yetwale',
                address: this.configService.get('SMTP_MAIL'),
            },
            to: dto.email,
            subject: 'verify your email',
            html: `<div> 
      <h1>Verify your Email</h1>
      <p>Please click the link below to verify your email</p>
      <a href="http://" target="_blank">Verify your Email</a>
      </div>`,
        };
        try {
            await transporter.sendMail(mailerOptions);
            return { success: 'success' };
        }
        catch (err) {
            console.log(err);
        }
    }
};
MailerService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], MailerService);
exports.MailerService = MailerService;
//# sourceMappingURL=mailer.service.js.map