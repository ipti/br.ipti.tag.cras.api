import { HttpException, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateForwardingDto } from '../dto/create-forwarding.dto';
import { optionalKeyValidation } from 'src/utils/optionalKeysValidation';
import { JwtPayload } from 'src/utils/jwt.interface';

@Injectable()
export class ForwardingBffService {
  constructor(private readonly prismaService: PrismaService) {}

  async createForwarding(
    user: JwtPayload,
    forwardingCreate: CreateForwardingDto,
  ) {
    const forwarding = await this.prismaService.forwading.create({
      data: {
        ...forwardingCreate,
        edcenso_city: {
          connect: {
            id: user.edcenso_city_fk,
          },
        },
      },
    });

    return forwarding;
  }

  async updateForwarding(
    forwardingId: string,
    forwardingUpdate: CreateForwardingDto,
  ) {
    const forwarding = await this.prismaService.forwading.update({
      where: { id: +forwardingId },
      data: { ...forwardingUpdate },
    });

    return forwarding;
  }

  async getforwardings(edcenso_city_fk: number) {
    const forwardings = await this.prismaService.forwading.findMany({
      where: {
        edcenso_city_fk: edcenso_city_fk,
      },
    });

    const defaultForwarding = await this.prismaService.forwading.findMany({
      where: {
        edcenso_city_fk: null,
        canDelete: false,
      },
    });

    return [...defaultForwarding, ...forwardings];
  }
}
