import { Module } from '@nestjs/common';
import { ForwardingBffController } from './forwarding_bff.controller';
import { ForwardingBffService } from './service/forwarding_bff.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ForwardingBffController],
  providers: [ForwardingBffService],
  exports: [ForwardingBffService],
})
export class ForwardingBffModule {}
