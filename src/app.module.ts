import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrometheusModule } from '@willsoto/nestjs-prometheus';
import { ConfigModule } from '@nestjs/config';
import { AddressModule } from './direct/address/address.module';
import { AttendanceModule } from './direct/attendance/attendance.module';
import { BenefitsModule } from './direct/benefits/benefits.module';
import { FamilyModule } from './direct/family/family.module';
import { TaskModule } from './direct/task/task.module';
import { TechnicianModule } from './direct/technician/technician.module';
import { UserModule } from './direct/user/user.module';
import { UserIdentifyModule } from './direct/user-identify/user_identify.module';
import { VulnerabilityModule } from './direct/vulnerability/vulnerability.module';
import { JwtMiddleware } from './utils/middleware/jwt.middleware';
import { ChartsModule } from './bff/charts/charts.module';
import { AttendanceUnityModule } from './direct/attendance-unity/attendance_unity.module';
import { FamilyBenefitsModule } from './direct/family-benefits/family_benefits.module';
import { BFFModule } from './bff/bff.module';
import { DirectModule } from './direct/direct.module';
import { RouterModule } from '@nestjs/core';
import { AttendanceBffModule } from './bff/attendance-bff/attendance_bff.module';
import { AttendanceUnityBffModule } from './bff/attendance-unity-bff/attendance_unity_bff.module';
import { EdcensoBffModule } from './bff/edcenso-bff/edcenso_bff.module';
import { FamilyBffModule } from './bff/family-bff/family_bff.module';
import { UserIdentifyBffModule } from './bff/user-identify-bff/user_identify_bff.module';
import { SeedService } from './prisma/seed.service';
import { CondicionalitiesBffModule } from './bff/condicionalities-bff/condicionalities_bff.module';
import { CRASRMAModule } from './bff/reports/CRAS/cras.module';
import { FOUIForwardingBffModule } from './bff/FOUIforwarding-bff/FOUIforwarding_bff.module';
import { UserIdentifyVulnerabilityBffModule } from './bff/user_identify_vulnerability-bff/user_identify_vulnerability_bff.module';
import { ForwardingBffModule } from './bff/forwarding-bff/forwarding_bff.module';
import { TechnicianVisitsBffModule } from './bff/technician-visits-bff/technician_visits.module';
import { HappyChildFamilyModule } from './direct/happy-child-family/happy_child_family.module';

@Module({
  imports: [
    ConfigModule.forRoot({ cache: true }),
    PrometheusModule.register(),
    AuthModule,
    BFFModule,
    DirectModule,
    RouterModule.register([
      {
        path: 'bff',
        module: BFFModule,
        children: [
          {
            path: 'attendance',
            module: AttendanceBffModule,
          },
          {
            path: 'attendance-unity',
            module: AttendanceUnityBffModule,
          },
          {
            path: 'charts',
            module: ChartsModule,
          },
          {
            path: 'edcenso',
            module: EdcensoBffModule,
          },
          {
            path: 'family',
            module: FamilyBffModule,
          },
          {
            path: 'user-identify',
            module: UserIdentifyBffModule,
          },
          {
            path: 'condicionalities',
            module: CondicionalitiesBffModule,
          },
          {
            path: 'reports-cras',
            module: CRASRMAModule,
          },
          {
            path: 'foui-forwarding',
            module: FOUIForwardingBffModule,
          },
          {
            path: 'forwarding',
            module: ForwardingBffModule,
          },
          {
            path: 'user-identify-vulnerability',
            module: UserIdentifyVulnerabilityBffModule,
          },
          {
            path: 'technician-visits',
            module: TechnicianVisitsBffModule,
          },
        ],
      },
      {
        path: 'direct',
        module: DirectModule,
        children: [
          {
            path: 'address',
            module: AddressModule,
          },
          {
            path: 'attendance',
            module: AttendanceModule,
          },
          {
            path: 'attendance-unity',
            module: AttendanceUnityModule,
          },
          {
            path: 'benefits',
            module: BenefitsModule,
          },
          {
            path: 'family',
            module: FamilyModule,
          },
          {
            path: 'family-benefits',
            module: FamilyBenefitsModule,
          },
          {
            path:'happy-child-family',
            module: HappyChildFamilyModule,
          },
          {
            path: 'task',
            module: TaskModule,
          },
          {
            path: 'technician',
            module: TechnicianModule,
          },
          {
            path: 'user',
            module: UserModule,
          },
          {
            path: 'user-identify',
            module: UserIdentifyModule,
          },
          {
            path: 'vulnerability',
            module: VulnerabilityModule,
          },
        ],
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService, SeedService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JwtMiddleware).forRoutes('*');
  }
}
