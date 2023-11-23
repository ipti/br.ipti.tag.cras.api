import { Module, forwardRef } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import CRASRMAController from './cras.controller';
import CRASRMAService from './shared/cras.service';

@Module({
  imports: [PrismaModule],
  controllers: [CRASRMAController],
  providers: [CRASRMAService],
  exports: [CRASRMAService],
})
export class CRASRMAModule {}
