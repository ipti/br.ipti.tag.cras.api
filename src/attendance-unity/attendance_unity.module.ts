import { Module } from '@nestjs/common';
import { AttendanceUnityController } from './attendance_unity.controller';
import { AttendanceUnityService } from './service/attendance_unity.service';
import { UserModule } from '../user/user.module';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule, UserModule],
  controllers: [AttendanceUnityController],
  providers: [AttendanceUnityService],
  exports: [AttendanceUnityService],
})
export class AttendanceUnityModule {}
