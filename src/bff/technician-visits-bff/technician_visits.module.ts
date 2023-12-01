import { Module } from '@nestjs/common';
import { TechnicianVisitsBffController } from './technician_visits.controller';
import { TechnicianVisitsBffService } from './service/technician_visits.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [TechnicianVisitsBffController],
  providers: [TechnicianVisitsBffService],
  exports: [TechnicianVisitsBffService],
})
export class TechnicianVisitsBffModule {}
