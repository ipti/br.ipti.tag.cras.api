import {
  Controller,
  Post,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { memoryStorage } from 'multer';
import { Response } from 'express';
import { JwtAuthGuard } from '../../auth/shared/jwt-auth.guard';
import { FileUploadBffService } from './service/file_upload_bff.service';

@ApiTags('FileUpload')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('access-token')
@Controller()
export class FileUploadBffController {
  constructor(private readonly fileUploadBffService: FileUploadBffService) {}

  @Post()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file', { storage: memoryStorage() }))
  upload(@UploadedFile() file: Express.Multer.File) {
    return this.fileUploadBffService.uploadFile(file);
  }

  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.fileUploadBffService.getFile(id);
  }

  @Get(':id/stream')
  async stream(
    @Param('id', ParseIntPipe) id: number,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.fileUploadBffService.streamFile(id, res);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.fileUploadBffService.deleteFile(id);
  }
}
