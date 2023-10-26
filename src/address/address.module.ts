import { Module } from '@nestjs/common';
import { AddressController } from './address.controller';
import { AddressService } from './service/address.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [AddressController],
  providers: [AddressService],
  exports: [AddressService],
})
export class AddressModule {}
