import { Module, forwardRef } from '@nestjs/common';
import { TaskController } from './task.controller';
import { TaskService } from './service/task.service';
import { AttendanceModule } from '../attendance/attendance.module';

@Module({
  imports: [forwardRef(() =>AttendanceModule)],
  controllers: [TaskController],
  providers: [TaskService],
  exports: [TaskService],
})
export class TaskModule {}
