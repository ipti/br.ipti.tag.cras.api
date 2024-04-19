import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateForwardingDto } from '../dto/create-forwarding.dto';
import { optionalKeyValidation } from 'src/utils/optionalKeysValidation';
import { JwtPayload } from 'src/utils/jwt.interface';
import { UpdateForwardingDto } from '../dto/update-forwarding.dto';
import { Status_document } from '@prisma/client';

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
    forwardingUpdate: UpdateForwardingDto,
  ) {
    const findForwarding = await this.prismaService.forwading.findUnique({
      where: { id: +forwardingId },
    });

    if (!findForwarding) {
      throw new HttpException('Encaminhamento não encontrado', HttpStatus.NOT_FOUND);
    }

    if (findForwarding.canDelete === false) {
      throw new HttpException(
        'Encaminhamento não pode ser alterado',
        HttpStatus.FORBIDDEN,
      );
    }

    const forwarding = await this.prismaService.forwading.update({
      where: { id: +forwardingId },
      data: { ...forwardingUpdate },
    });

    return forwarding;
  }

  async updateForwardingStatus(
    forwardingId: string,
    status: Status_document,
  ) {
    const findForwarding = await this.prismaService.forwading.findUnique({
      where: { id: +forwardingId },
    });

    if (!findForwarding) {
      throw new HttpException('Encaminhamento não encontrado', HttpStatus.NOT_FOUND);
    }

    const forwarding = await this.prismaService.forwading.update({
      where: { id: +forwardingId },
      data: { status: status}
    });

    return forwarding;
  }

  async getforwardings(user: JwtPayload) {
    const forwardings = await this.prismaService.forwading.findMany({
      where: {
        edcenso_city_fk: user.edcenso_city_fk,
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
