import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrometheusModule } from '@willsoto/nestjs-prometheus';
import { ConfigModule } from '@nestjs/config';
import { AddressModule } from './address/address.module';
import { AttendanceModule } from './attendance/attendance.module';
import { BenefitsModule } from './benefits/benefits.module';
import { FamilyModule } from './family/family.module';
import { TaskModule } from './task/task.module';
import { TechnicianModule } from './technician/technician.module';
import { UserModule } from './user/user.module';
import { UserIdentifyModule } from './user-identify/user_identify.module';
import { VulnerabilityModule } from './vulnerability/vulnerability.module';
import { DbNameMiddleware } from './utils/middleware/db-name';
import { JwtMiddleware } from './utils/middleware/jwt.middleware';
import { ChartsModule } from './charts/charts.module';
import { AttendanceUnityModule } from './attendance-unity/attendance_unity.module';
import { BffModule } from './bff/bff.module';

@Module({
  imports: [
    ConfigModule.forRoot({ cache: true }),
    PrometheusModule.register(),
    AuthModule,
    AddressModule,
    AttendanceModule,
    AttendanceUnityModule,
    BenefitsModule,
    FamilyModule,
    TaskModule,
    TechnicianModule,
    UserModule,
    UserIdentifyModule,
    VulnerabilityModule,
    ChartsModule,
    BffModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JwtMiddleware).forRoutes('*');
    consumer.apply(DbNameMiddleware).forRoutes('*');
  }
}
