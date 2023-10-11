import { Module, forwardRef } from '@nestjs/common';
import { UserIdentifyController } from './user_identify.controller';
import { UserIdentifyService } from './service/user_identify.service';
import { FamilyModule } from '../family/family.module';
import { VulnerabilityModule } from '../vulnerability/vulnerability.module';

@Module({
  imports: [forwardRef(() => FamilyModule), VulnerabilityModule],
  controllers: [UserIdentifyController],
  providers: [UserIdentifyService],
  exports: [UserIdentifyService],
})
export class UserIdentifyModule {}
