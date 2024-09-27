import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller('files')
export class UploadsController {
  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: '../front-projet/src/assets/images',
        filename: (req, file, cb) => {
          const randomName = Array(6)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          cb(null, `${(file.originalname)}`); //need to check this we normally have to 
          //use the randomName
        },
      }),
    }),
  )
  uploadFile(@UploadedFile() file) {
    return { message: 'Fichier téléchargé avec succès' };
  }
}
