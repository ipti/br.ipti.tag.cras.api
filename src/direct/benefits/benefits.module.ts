import { Module } from '@nestjs/common';
import { BenefitsController } from './benefits.controller';
import { BenefitsService } from './service/benefits.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [BenefitsController],
  providers: [BenefitsService],
  exports: [BenefitsService],
})
export class BenefitsModule {}
