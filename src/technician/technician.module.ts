import { Module } from '@nestjs/common';
import { TechnicianController } from './technician.controller';
import { TechnicianService } from './service/technician.service';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [UserModule],
  controllers: [TechnicianController],
  providers: [TechnicianService],
  exports: [TechnicianService],
})
export class TechnicianModule {}
