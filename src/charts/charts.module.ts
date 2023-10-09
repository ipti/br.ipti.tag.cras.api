import { Module } from '@nestjs/common';
import { ChartsController } from './charts.controller';
import { ChartsService } from './service/charts.service';

@Module({
  imports: [],
  controllers: [ChartsController],
  providers: [ChartsService],
  exports: [ChartsService],
})
export class ChartsModule {}
