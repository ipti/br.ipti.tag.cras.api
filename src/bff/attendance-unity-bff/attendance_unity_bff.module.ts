import { Module } from '@nestjs/common';
import { AttendanceUnityBffController } from './attendance_unity_bff.controller';
import { AttendanceUnityBffService } from './service/attendance_unity_bff.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { EdcensoBffModule } from '../edcenso-bff/edcenso_bff.module';

@Module({
  imports: [PrismaModule, EdcensoBffModule],
  controllers: [AttendanceUnityBffController],
  providers: [AttendanceUnityBffService],
  exports: [AttendanceUnityBffService],
})
export class AttendanceUnityBffModule {}
