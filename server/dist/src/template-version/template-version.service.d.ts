import { PrismaService } from 'prisma/prisma.service';
export declare class TemplateVersionService {
    private prismaService;
    constructor(prismaService: PrismaService);
    getTemplateVersion(id: string): Promise<{
        templateVersion: any;
    }>;
}
