import { Module } from '@nestjs/common';
import { HappyChildFamilyController } from './happy_child_family.controller';
import { HappyChildFamilyService } from './service/happy_child_family.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [HappyChildFamilyController],
  providers: [HappyChildFamilyService],
  exports: [HappyChildFamilyService],
})
export class HappyChildFamilyModule {}
