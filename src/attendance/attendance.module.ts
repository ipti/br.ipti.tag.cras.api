import { Module } from '@nestjs/common';
import { AttendanceController } from './attendance.controller';
import { AttendanceService } from './service/attendance.service';
import { UserIdentifyModule } from '../user-identify/user_identify.module';
import { TechnicianModule } from '../technician/technician.module';

@Module({
  imports: [UserIdentifyModule, TechnicianModule],
  controllers: [AttendanceController],
  providers: [AttendanceService],
  exports: [AttendanceService],
})
export class AttendanceModule {}
