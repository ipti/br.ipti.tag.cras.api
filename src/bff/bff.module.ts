import { Module } from '@nestjs/common';
import { AttendanceBffModule } from './attendance-bff/attendance_bff.module';
import { AttendanceUnityBffModule } from './attendance-unity-bff/attendance_unity_bff.module';
import { ChartsModule } from './charts/charts.module';
import { EdcensoBffModule } from './edcenso-bff/edcenso_bff.module';
import { FamilyBffModule } from './family-bff/family_bff.module';
import { UserIdentifyBffModule } from './user-identify-bff/user_identify_bff.module';
import { CondicionalitiesBffModule } from './condicionalities-bff/condicionalities_bff.module';
import { CRASRMAModule } from './reports/CRAS/cras.module';
import { FOUIForwardingBffModule } from './FOUIforwarding-bff/FOUIforwarding_bff.module';
import { UserIdentifyVulnerabilityBffModule } from './user_identify_vulnerability-bff/user_identify_vulnerability_bff.module';
import { ForwardingBffModule } from './forwarding-bff/forwarding_bff.module';
import { TechnicianVisitsBffModule } from './technician-visits-bff/technician_visits.module';

@Module({
  imports: [
    AttendanceBffModule,
    AttendanceUnityBffModule,
    ChartsModule,
    EdcensoBffModule,
    FamilyBffModule,
    UserIdentifyBffModule,
    CondicionalitiesBffModule,
    CRASRMAModule,
    FOUIForwardingBffModule,
    ForwardingBffModule,
    UserIdentifyVulnerabilityBffModule,
    TechnicianVisitsBffModule,
    
  ],
})
export class BFFModule {}
