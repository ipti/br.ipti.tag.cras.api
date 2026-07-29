import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { FileUploadBffController } from './file_upload_bff.controller';
import { FileUploadBffService } from './service/file_upload_bff.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule, ConfigModule],
  controllers: [FileUploadBffController],
  providers: [FileUploadBffService],
  exports: [FileUploadBffService],
})
export class FileUploadBffModule {}
