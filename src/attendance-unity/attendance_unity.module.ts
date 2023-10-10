import { Module } from '@nestjs/common';
import { AttendanceUnityController } from './attendance_unity.controller';
import { AttendanceUnityService } from './service/attendance_unity.service';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [UserModule],
  controllers: [AttendanceUnityController],
  providers: [AttendanceUnityService],
  exports: [AttendanceUnityService],
})
export class AttendanceUnityModule {}
