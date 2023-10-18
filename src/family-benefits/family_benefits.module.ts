import { Module } from '@nestjs/common';
import { FamilyBenefitsController } from './family_benefits.controller';
import { FamilyBenefitsService } from './service/family_benefits.service';

@Module({
  imports: [],
  controllers: [FamilyBenefitsController],
  providers: [FamilyBenefitsService],
  exports: [FamilyBenefitsService],
})
export class FamilyBenefitsModule {}
