import { Module } from '@nestjs/common';
import { BffController } from './bff.controller';
import { BffService } from './service/bff.service';
import { AttendanceUnityModule } from '../attendance-unity/attendance_unity.module';

@Module({
  imports: [AttendanceUnityModule],
  controllers: [BffController],
  providers: [BffService],
  exports: [BffService],
})
export class BffModule {}
