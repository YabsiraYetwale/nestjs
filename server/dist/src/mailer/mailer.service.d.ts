import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import { sendEmail } from './dto/mailer.dto';
export declare class MailerService {
    private readonly configService;
    constructor(configService: ConfigService);
    mailTransport(): nodemailer.Transporter<unknown>;
    sendMailer(dto: sendEmail): Promise<{
        success: string;
    }>;
}
