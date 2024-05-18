import { TemplateVersionService } from './template-version.service';
export declare class TemplateVersionController {
    private templateVersionService;
    constructor(templateVersionService: TemplateVersionService);
    getTemplateV1(id: string): Promise<{
        templateVersion: any;
    }>;
    getTemplateV2(id: string): Promise<{
        templateVersion: any;
    }>;
    getTemplateV3(id: string): Promise<{
        templateVersion: any;
    }>;
    getTemplateV4(id: string): Promise<{
        templateVersion: any;
    }>;
    getTemplateV5(id: string): Promise<{
        templateVersion: any;
    }>;
}
