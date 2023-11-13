import { Module } from '@nestjs/common';
import { FamilyBffController } from './family_bff.controller';
import { FamilyBffService } from './service/family_bff.service';
import { AttendanceUnityModule } from '../../direct/attendance-unity/attendance_unity.module';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule, AttendanceUnityModule],
  controllers: [FamilyBffController],
  providers: [FamilyBffService],
  exports: [FamilyBffService],
})
export class FamilyBffModule {}
