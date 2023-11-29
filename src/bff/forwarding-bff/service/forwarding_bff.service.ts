import { HttpException, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateForwardingDto } from '../dto/create-forwarding.dto';
import { optionalKeyValidation } from 'src/utils/optionalKeysValidation';

@Injectable()
export class ForwardingBffService {
  constructor(private readonly prismaService: PrismaService) {}

  async createForwarding(forwardingCreate: CreateForwardingDto) {
    const forwarding = await this.prismaService.forwading.create({
      data: { ...forwardingCreate },
    });

    return forwarding;
  }

  updateForwarding(
    forwardingId: string,
    forwardingUpdate: CreateForwardingDto,
  ) {
    const forwarding = this.prismaService.forwading.update({
      where: { id: +forwardingId },
      data: { ...forwardingUpdate },
    });

    return forwarding;
  }
}
