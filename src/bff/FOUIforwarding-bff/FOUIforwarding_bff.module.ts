import { Module } from '@nestjs/common';
import { FOUIForwardingBffController } from './FOUIforwarding_bff.controller';
import { FOUIForwardingBffService } from './service/FOUIforwarding_bff.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [FOUIForwardingBffController],
  providers: [FOUIForwardingBffService],
  exports: [FOUIForwardingBffService],
})
export class FOUIForwardingBffModule {}
