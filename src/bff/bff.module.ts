import { Module } from '@nestjs/common';
import { BffController } from './bff.controller';
import { BffService } from './service/bff.service';

@Module({
  imports: [],
  controllers: [BffController],
  providers: [BffService],
  exports: [BffService],
})
export class BffModule {}
