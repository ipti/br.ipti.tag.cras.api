import { Module } from '@nestjs/common';
import { AttendanceUnityBffController } from './attendance_unity_bff.controller';
import { AttendanceUnityBffService } from './service/attendance_unity_bff.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { FileUploadBffModule } from '../file-upload/file_upload_bff.module';

@Module({
  imports: [PrismaModule, FileUploadBffModule],
  controllers: [AttendanceUnityBffController],
  providers: [AttendanceUnityBffService],
  exports: [AttendanceUnityBffService],
})
export class AttendanceUnityBffModule {}
