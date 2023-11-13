import { Module, forwardRef } from '@nestjs/common';
import { EdcensoBffController } from './edcenso_bff.controller';
import { EdcensoBffService } from './service/edcenso_bff.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AttendanceUnityModule } from 'src/direct/attendance-unity/attendance_unity.module';

@Module({
  imports: [PrismaModule],
  controllers: [EdcensoBffController],
  providers: [EdcensoBffService],
  exports: [EdcensoBffService],
})
export class EdcensoBffModule {}
