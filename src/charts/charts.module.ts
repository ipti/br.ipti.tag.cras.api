import { Module } from '@nestjs/common';
import { ChartsController } from './charts.controller';
import { ChartsService } from './service/charts.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ChartsController],
  providers: [ChartsService],
  exports: [ChartsService],
})
export class ChartsModule {}
