import { Module, forwardRef } from '@nestjs/common';
import { UserIdentifyBffController } from './user_identify_bff.controller';
import { UserIdentifyBffService } from './service/user_identify_bff.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AttendanceUnityModule } from 'src/direct/attendance-unity/attendance_unity.module';
import { EdcensoBffModule } from '../edcenso-bff/edcenso_bff.module';

@Module({
  imports: [PrismaModule, AttendanceUnityModule, EdcensoBffModule],
  controllers: [UserIdentifyBffController],
  providers: [UserIdentifyBffService],
  exports: [UserIdentifyBffService],
})
export class UserIdentifyBffModule {}
