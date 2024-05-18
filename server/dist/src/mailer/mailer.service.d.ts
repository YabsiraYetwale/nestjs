import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'prisma/prisma.service';
export declare class MailerService {
    private prismaService;
    private readonly configService;
    constructor(prismaService: PrismaService, configService: ConfigService);
    private mailTransport;
    sendInvoiceEmail(id: string): Promise<{
        success: string;
        email: any;
    }>;
}
