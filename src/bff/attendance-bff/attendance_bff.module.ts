import { Module } from '@nestjs/common';
import { AttendanceBffController } from './attendance_bff.controller';
import { AttendanceBffService } from './service/attendance_bff.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { EdcensoBffService } from '../edcenso-bff/service/edcenso_bff.service';

@Module({
  imports: [PrismaModule],
  controllers: [AttendanceBffController],
  providers: [AttendanceBffService, EdcensoBffService],
  exports: [AttendanceBffService],
})
export class AttendanceBffModule {}
