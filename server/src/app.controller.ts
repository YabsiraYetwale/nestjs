
import {
  Controller,
  Get,
  Post,
  Req,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { Request } from 'express';

@Controller()
export class AppController {
  @Post('/files')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'file1', maxCount: 1 },
      { name: 'file2', maxCount: 1 },
    ], {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1E9);
          const ext = extname(file.originalname);
          const filename = `${uniqueSuffix}${ext}`;
          callback(null, filename);
        },
      }),
    }),
  )
  handleUpload(
    @UploadedFiles()
    files: {
      file1?: Express.Multer.File[];
      file2?: Express.Multer.File[];
    },
    @Req() request: Request,
  ) {
    
    const protocol = request.protocol;
    const host = request.get('host'); 
    
    // Generate the file URLs
    const file1Url = files.file1 ? `${protocol}://${host}/${files.file1[0].filename}` : null;
    const file2Url = files.file2 ? `${protocol}://${host}/${files.file2[0].filename}` : null;
  
    console.log('file1', file1Url);
    console.log('file2Url', file2Url);
  
    // Process the uploaded files as needed
  
    return 'Files uploaded successfully';
  }
}