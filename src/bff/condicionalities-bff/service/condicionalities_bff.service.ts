import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCondicionalitiesBffDto } from '../dto/create-condicionalities_bff.dto';
import { HttpException, HttpStatus } from '@nestjs/common';
import { JwtPayload } from 'src/utils/jwt.interface';
import { UpdateCondicionalitiesBffDto } from '../dto/update-condicionalities_bff.dto';

@Injectable()
export class CondicionalitiesBffService {
  constructor(private readonly prismaService: PrismaService) {}

  async createForFamily(
    user: JwtPayload,
    createCondicionalities: CreateCondicionalitiesBffDto,
  ) {
    const transaction = await this.prismaService.$transaction(async (tx) => {
      const family = await tx.family.findUnique({
        where: {
          id: createCondicionalities.family,
        },
      });

      if (!family) {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            error: 'Familia não encontrada',
          },
          HttpStatus.NOT_FOUND,
        );
      }

      if (family.attendance_unity_fk !== user.attendance_unity_fk) {
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            error: 'Unidade de atendimento não pertence a familia',
          },
          HttpStatus.BAD_REQUEST,
        );
      }

      const condicionalities = await tx.condicionalities.create({
        data: {
          family: {
            connect: {
              id: family.id,
            },
          },
          vaccination_schedule: createCondicionalities.vaccination_schedule,
          nutritional_status: createCondicionalities.nutritional_status,
          prenatal: createCondicionalities.prenatal,
          school_frequency: createCondicionalities.school_frequency,
        },
      });

      return condicionalities;
    });

    return transaction;
  }

  async updateForFamily(
    user: JwtPayload,
    createCondicionalities: UpdateCondicionalitiesBffDto,
  ) {
    const transaction = await this.prismaService.$transaction(async (tx) => {
      const family = await tx.family.findUnique({
        where: {
          id: createCondicionalities.family,
        },
      });

      if (!family) {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            error: 'Familia não encontrada',
          },
          HttpStatus.NOT_FOUND,
        );
      }

      if (family.attendance_unity_fk !== user.attendance_unity_fk) {
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            error: 'Unidade de atendimento não pertence a familia',
          },
          HttpStatus.BAD_REQUEST,
        );
      }

      const condicionalities = await tx.condicionalities.update({
        where: {
          family_fk: family.id,
        },
        data: {
          vaccination_schedule: createCondicionalities.vaccination_schedule,
          nutritional_status: createCondicionalities.nutritional_status,
          prenatal: createCondicionalities.prenatal,
          school_frequency: createCondicionalities.school_frequency,
        },
      });

      return condicionalities;
    });

    return transaction;
  }
}
