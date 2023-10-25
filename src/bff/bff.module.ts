import { Module } from '@nestjs/common';
import { BffController } from './bff.controller';
import { BffService } from './service/bff.service';
import { AttendanceUnityModule } from '../attendance-unity/attendance_unity.module';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule, AttendanceUnityModule],
  controllers: [BffController],
  providers: [BffService],
  exports: [BffService],
})
export class BffModule {}
