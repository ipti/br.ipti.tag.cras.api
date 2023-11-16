import { Module } from '@nestjs/common';
import { CondicionalitiesBffController } from './condicionalities_bff.controller';
import { CondicionalitiesBffService } from './service/condicionalities_bff.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [CondicionalitiesBffController],
  providers: [CondicionalitiesBffService],
  exports: [CondicionalitiesBffService],
})
export class CondicionalitiesBffModule {}
