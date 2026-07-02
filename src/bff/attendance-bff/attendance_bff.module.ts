import { Module } from '@nestjs/common';
import { AttendanceBffController } from './attendance_bff.controller';
import { AttendanceBffService } from './service/attendance_bff.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [AttendanceBffController],
  providers: [AttendanceBffService],
  exports: [AttendanceBffService],
})
export class AttendanceBffModule {}
