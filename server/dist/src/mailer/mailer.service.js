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
const prisma_service_1 = require("../../prisma/prisma.service");
let MailerService = class MailerService {
    constructor(prismaService, configService) {
        this.prismaService = prismaService;
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
    async sendInvoiceEmail(id) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
        const invoiceData = await this.prismaService.Invoices.findUnique({
            where: id,
            include: { line_items: true, client: true },
        });
        if (!invoiceData) {
            throw new common_1.HttpException("invoiceData doesn't exist", 404);
        }
        if (invoiceData) {
            const transporter = this.mailTransport();
            const mailerOptions = {
                from: {
                    name: 'Yabsira Yetwale',
                    address: this.configService.get('SMTP_MAIL'),
                },
                to: invoiceData.client_id,
                subject: 'Invoice Report',
                html: `
        <!DOCTYPE html>
          <html lang="en">
          <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Invoice Report</title>
          </head>
          <body>
            <div style="gap: 1rem;">
                <div style="display: flex; gap: 1rem;">
                  <div style="display: flex; gap: 1rem;">
                  </div>
                </div>
                <div>
                  <div>
                    <div style="gap: 2.5rem; width: 100%;">
                      <div style="display:flex; align-items: center; justify-content: space-between;">
                        <div style="display: flex; gap: 0.5rem; align-items: center; color: #3b82f6;">
                          <h1 style="font-size: 2rem; font-weight: 600;">
                            <div style="display: flex; padding: 0.5rem; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);">
                              <span style="color: #10b981;">Invoice</span>
                              <span style="color: #3b82f6;">Systm</span>
                            </div>
                          </h1>
                        </div>
                        <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        </div>
                        <div>
                          <span style="font-size: 1.125rem; font-weight: 700;">Invoice</span>
                          <div style=">
                            <p><strong></strong><span style="font-weight: 300;"></span></p
                            <p><strong>Invoice Number: </strong><span style="font-weight: 300;">${invoiceData === null || invoiceData === void 0 ? void 0 : invoiceData.invoice_number}</span></p>
                            <p><strong>Billing Date: </strong><span style="font-weight: 300;">${invoiceData === null || invoiceData === void 0 ? void 0 : invoiceData.due_date}</span></p>
                            <p><strong>Due Date: </strong><span style="font-weight: 300;">${invoiceData === null || invoiceData === void 0 ? void 0 : invoiceData.due_date}</span></p>
                          </div>
                        </div>
                      </div>
                      <div style="display: flex; justify-content: space-around; gap: 1.25rem;">
                        <div style="gap: 0.75rem;">
                          <strong>Company Information<hr/></strong>
                          <p>InvoiceSystm</p>
                          <p>${(_a = invoiceData === null || invoiceData === void 0 ? void 0 : invoiceData.client) === null || _a === void 0 ? void 0 : _a.billing_address}</p>
                          <p>Company No: 69940000</p>
                          <p>Company Vat: 69000007</p>
                        </div>
                        <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        </div>
                        <div style="gap: 0.75rem;">
                          <strong>Billing To<hr/></strong>
                          <p>${(_b = invoiceData === null || invoiceData === void 0 ? void 0 : invoiceData.client) === null || _b === void 0 ? void 0 : _b.name}</p>
                          <p>${(_c = invoiceData === null || invoiceData === void 0 ? void 0 : invoiceData.client) === null || _c === void 0 ? void 0 : _c.billing_address}</p>
                          <p>${(_d = invoiceData === null || invoiceData === void 0 ? void 0 : invoiceData.client) === null || _d === void 0 ? void 0 : _d.email}</p>
                          <p>${(_e = invoiceData === null || invoiceData === void 0 ? void 0 : invoiceData.client) === null || _e === void 0 ? void 0 : _e.phone}</p>
                        </div>
                        <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        </div>
                        <div style="gap: 0.75rem;">
                          <strong>Shipping To<hr/></strong>
                          <p>${(_f = invoiceData === null || invoiceData === void 0 ? void 0 : invoiceData.client) === null || _f === void 0 ? void 0 : _f.name}</p>
                          <p>${(_g = invoiceData === null || invoiceData === void 0 ? void 0 : invoiceData.client) === null || _g === void 0 ? void 0 : _g.shipping_address}</p>
                          <p>${(_h = invoiceData === null || invoiceData === void 0 ? void 0 : invoiceData.client) === null || _h === void 0 ? void 0 : _h.shipping_state}</p>
                          <p>${(_j = invoiceData === null || invoiceData === void 0 ? void 0 : invoiceData.client) === null || _j === void 0 ? void 0 : _j.shipping_zip}</p>
                        </div>
                        <div></div>
                      </div>
                      <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      </div>
                      <section style="display: grid; grid-template-columns: 1fr; gap: 1rem; transition: all;">
                        <table border="1" >
                            <thead>
                              <tr>
                                <th>Item</th>
                                <th>Quantity</th>
                                <th>Unit Price($)</th>
                                <th>Tax Rate(%)</th>
                                <th>Amount($)</th>
                              </tr>
                            </thead>
                            ${invoiceData.line_items.map((lineItem) => `<tbody>
                              <tr>
                                <td>${lineItem.description}</td>
                                <td>${lineItem.quantity}</td>
                                <td>${lineItem.unit_price}</td>
                                <td>${lineItem.tax_rate}</td>
                                <td>${lineItem.quantity * lineItem.unit_price}</td>
                              </tr>
                          </tbody>`)}
                          </table>
                          <div style="display: flex; justify-content: flex-end;">
                          <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                          </div>
                            <section style="justify-content: flex-end;">
                              <hr style="border: none; border-top-width: 1px; border-top-style: solid; margin-top: 0.5rem; margin-bottom: 0.5rem;">
                              <div style="display: flex; align-items: center; gap: 1rem;">
                                <p style="font-size: 1.125rem; font-weight: 700;">Total Amount($)</p>&nbsp;&nbsp;
                                <p style="font-size: 1.125rem; font-weight: 700;; color: #9ca3af;">${invoiceData === null || invoiceData === void 0 ? void 0 : invoiceData.total_amount}</p>
                              </div>
                            </section>
                          </div>
                      </section>
                    </div>
                  </div>
                </div>
              </div>
        </body>
        </html>`
            };
            try {
                await transporter.sendMail(mailerOptions);
                return { success: 'success', email: invoiceData.client_id };
            }
            catch (err) {
                console.log(err);
            }
        }
        else {
            console.log(`Invoice not found for ID: ${id}`);
        }
    }
};
MailerService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService, config_1.ConfigService])
], MailerService);
exports.MailerService = MailerService;
//# sourceMappingURL=mailer.service.js.map