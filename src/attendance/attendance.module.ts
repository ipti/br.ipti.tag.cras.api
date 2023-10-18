import { Module, forwardRef } from '@nestjs/common';
import { AttendanceController } from './attendance.controller';
import { AttendanceService } from './service/attendance.service';
import { UserIdentifyModule } from '../user-identify/user_identify.module';
import { TechnicianModule } from '../technician/technician.module';
import { TaskModule } from '../task/task.module';
import { AttendanceUnityModule } from '../attendance-unity/attendance_unity.module';

@Module({
  imports: [UserIdentifyModule, TechnicianModule, forwardRef(() =>TaskModule), AttendanceUnityModule],
  controllers: [AttendanceController],
  providers: [AttendanceService],
  exports: [AttendanceService],
})
export class AttendanceModule {}
