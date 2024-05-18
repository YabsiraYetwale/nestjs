/// <reference types="multer" />
import { Request } from 'express';
export declare class AppController {
    handleUpload(files: {
        file1?: Express.Multer.File[];
        file2?: Express.Multer.File[];
    }, request: Request): string;
}
