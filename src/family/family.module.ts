import { Module, forwardRef } from '@nestjs/common';
import { FamilyController } from './family.controller';
import { FamilyService } from './service/family.service';
import { AddressModule } from 'src/address/address.module';
import { UserIdentifyModule } from 'src/user-identify/user_identify.module';
import { BenefitsModule } from 'src/benefits/benefits.module';

@Module({
  imports: [forwardRef(() => UserIdentifyModule), AddressModule, BenefitsModule],
  controllers: [FamilyController],
  providers: [FamilyService],
  exports: [FamilyService],
})
export class FamilyModule {}
