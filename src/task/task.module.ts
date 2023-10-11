import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { TaskService } from './service/task.service';
import { AttendanceModule } from '../attendance/attendance.module';

@Module({
  imports: [AttendanceModule],
  controllers: [TaskController],
  providers: [TaskService],
  exports: [TaskService],
})
export class TaskModule {}
