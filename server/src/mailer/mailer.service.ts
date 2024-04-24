import { HttpException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import { TransportOptions } from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class MailerService {
  constructor(private prismaService: PrismaService,private readonly configService: ConfigService) {}

  private mailTransport() {
    const transporter = nodemailer.createTransport({
      service:'gmail',
      host: 'smtp.gmail.com',
      port: this.configService.get<string>('SMTP_PORT'),
      secure: false,
      auth: {
        user:this.configService.get<string>('SMTP_MAIL'),
        pass: this.configService.get<string>('SMTP_PASS'),
      },
    } as TransportOptions);
    return transporter;
  }

  async sendInvoiceEmail(id: string) {
    const invoiceData = await this.prismaService.Invoices.findUnique({ 
      where:id,
      include: { line_items: true, client: true },
    })

    if (!invoiceData) {
      throw new HttpException("invoiceData doesn't exist",404)
    }
    if (invoiceData) {
      const transporter = this.mailTransport();
      
      const mailerOptions: Mail.Options = {
        from: {
          name: 'Yabsira Yetwale',
          address: this.configService.get<string>('SMTP_MAIL'),
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
                            <p><strong>Invoice Number: </strong><span style="font-weight: 300;">${invoiceData?.invoice_number}</span></p>
                            <p><strong>Billing Date: </strong><span style="font-weight: 300;">${invoiceData?.due_date}</span></p>
                            <p><strong>Due Date: </strong><span style="font-weight: 300;">${invoiceData?.due_date}</span></p>
                          </div>
                        </div>
                      </div>
                      <div style="display: flex; justify-content: space-around; gap: 1.25rem;">
                        <div style="gap: 0.75rem;">
                          <strong>Company Information<hr/></strong>
                          <p>InvoiceSystm</p>
                          <p>${invoiceData?.client?.billing_address}</p>
                          <p>Company No: 69940000</p>
                          <p>Company Vat: 69000007</p>
                        </div>
                        <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        </div>
                        <div style="gap: 0.75rem;">
                          <strong>Billing To<hr/></strong>
                          <p>${invoiceData?.client?.name}</p>
                          <p>${invoiceData?.client?.billing_address}</p>
                          <p>${invoiceData?.client?.email}</p>
                          <p>${invoiceData?.client?.phone}</p>
                        </div>
                        <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        </div>
                        <div style="gap: 0.75rem;">
                          <strong>Shipping To<hr/></strong>
                          <p>${invoiceData?.client?.name}</p>
                          <p>${invoiceData?.client?.shipping_address}</p>
                          <p>${invoiceData?.client?.shipping_state}</p>
                          <p>${invoiceData?.client?.shipping_zip}</p>
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
                            ${invoiceData.line_items.map((lineItem:any) =>
                            `<tbody>
                              <tr>
                                <td>${lineItem.description}</td>
                                <td>${lineItem.quantity}</td>
                                <td>${lineItem.unit_price}</td>
                                <td>${lineItem.tax_rate}</td>
                                <td>${lineItem.quantity * lineItem.unit_price}</td>
                              </tr>
                          </tbody>`
                          )}
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
                                <p style="font-size: 1.125rem; font-weight: 700;; color: #9ca3af;">${invoiceData?.total_amount}</p>
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
        return { success: 'success',email:invoiceData.client_id };
      } catch (err) {
        console.log(err);
      }
    } else {
      console.log(`Invoice not found for ID: ${id}`);
    }
  }
}
