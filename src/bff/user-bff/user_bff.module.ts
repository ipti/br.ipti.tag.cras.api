import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserBffController } from './user_bff.controller';
import { UserBffService } from './service/user_bff.service';

@Module({
  imports: [PrismaModule],
  controllers: [UserBffController],
  providers: [UserBffService],
  exports: [UserBffService],
})
export class UserBffModule {}
