import { Module, forwardRef } from '@nestjs/common';
import { FamilyController } from './family.controller';
import { FamilyService } from './service/family.service';
import { AddressModule } from '../address/address.module';
import { UserIdentifyModule } from '../user-identify/user_identify.module';
import { BenefitsModule } from '../benefits/benefits.module';

@Module({
  imports: [forwardRef(() => UserIdentifyModule), AddressModule, BenefitsModule],
  controllers: [FamilyController],
  providers: [FamilyService],
  exports: [FamilyService],
})
export class FamilyModule {}
