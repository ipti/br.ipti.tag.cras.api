import { Module } from '@nestjs/common';
import { HappyChildFamilyController } from './happy_child_family.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { HappyChildFamilyService } from './service/happy_child.service';

@Module({
  imports: [PrismaModule],
  controllers: [HappyChildFamilyController],
  providers: [HappyChildFamilyService],
  exports: [HappyChildFamilyService],
})
export class HappyChildFamilyModule {}
