import { Module } from '@nestjs/common';
import { AddressModule } from './address/address.module';
import { AttendanceModule } from './attendance/attendance.module';
import { AttendanceUnityModule } from './attendance-unity/attendance_unity.module';
import { AuthModule } from '../auth/auth.module';
import { Benefits } from '@prisma/client';
import { BenefitsModule } from './benefits/benefits.module';
import { FamilyModule } from './family/family.module';
import { FamilyBenefitsModule } from './family-benefits/family_benefits.module';
import { TaskModule } from './task/task.module';
import { TechnicianModule } from './technician/technician.module';
import { UserModule } from './user/user.module';
import { UserIdentifyModule } from './user-identify/user_identify.module';
import { VulnerabilityModule } from './vulnerability/vulnerability.module';

@Module({
  imports: [
    AddressModule,
    AttendanceModule,
    AttendanceUnityModule,
    BenefitsModule,
    FamilyModule,
    FamilyBenefitsModule,
    TaskModule,
    TechnicianModule,
    UserModule,
    UserIdentifyModule,
    VulnerabilityModule,
  ],
})
export class DirectModule {}
