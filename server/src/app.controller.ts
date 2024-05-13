// import {
//     Controller,
//     Get,
//     Post,
//     UploadedFile,
//     UseInterceptors,
//   } from '@nestjs/common';
//   import { FileInterceptor } from '@nestjs/platform-express';
//   import { diskStorage } from 'multer';
//   import { extname } from 'path';
  
//   @Controller()
//   export class AppController {
  
  
//     @Post('/file')
//     @UseInterceptors(
//       FileInterceptor('file', {
//         storage: diskStorage({
//           destination: './uploads',
//           filename: (req, file, callback) => {
//             const uniqueSuffix =
//               Date.now() + '-' + Math.round(Math.random() * 1e9);
//             const ext = extname(file.originalname);
//             const filename = `${uniqueSuffix}${ext}`;
//             callback(null, filename);
//           },
//         }),
//       }),
//     )
//     handleUpload(@UploadedFile() file: Express.Multer.File) {
//       console.log('file', file);
//       return 'File upload API';
//     }
//   }
import {
  Controller,
  Get,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

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
  ) {
    console.log('file1', files.file1);
    console.log('file2', files.file2);
    // Process the uploaded files as needed
    return 'Files uploaded successfully';
  }
}