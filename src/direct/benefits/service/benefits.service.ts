import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateBenefitsDto } from '../dto/create-benefits.dto';
import { UpdateBenefitsDto } from '../dto/update-benefits.dto';
import { benefits } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { Request } from 'express';
import { optionalKeyValidation } from 'src/utils/optionalKeysValidation';

@Injectable()
export class BenefitsService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(
    request: Request,
    createBenefits: CreateBenefitsDto,
  ): Promise<benefits> {
    const createdBenefits = await this.prismaService.benefits.create({
      data: {
        ...createBenefits,
        edcenso_city: {
          connect: {
            id: request.user.edcenso_city_fk,
          },
        },
      },
    });

    return createdBenefits;
  }

  async findAll(request: Request): Promise<benefits[]> {
    const allBenefits = await this.prismaService.benefits.findMany({
      where: {
        edcenso_city_fk: request.user.edcenso_city_fk,
      },
    });

    const benefitsGeneral = await this.prismaService.benefits.findMany({
      where: {
        edcenso_city_fk: null,
      },
    });

    return [...benefitsGeneral, ...allBenefits];
  }

  async findOne(request: Request, id: string): Promise<benefits> {
    var benefits = await this.prismaService.benefits.findUnique({
      where: { id: +id, edcenso_city_fk: request.user.edcenso_city_fk },
    });

    if (!benefits) {
      benefits = await this.prismaService.benefits.findUnique({
        where: { id: +id, edcenso_city_fk: null },
      });
    }

    if (!benefits) {
      throw new HttpException('Benefits not found', HttpStatus.NOT_FOUND);
    }

    return benefits;
  }

  async update(
    request: Request,
    id: string,
    UpdateBenefitsDto: UpdateBenefitsDto,
  ) {
    await this.findOne(request, id);

    const cityOptional = optionalKeyValidation(request.user.edcenso_city_fk, {
      connect: {
        id: request.user.edcenso_city_fk,
      },
    });

    const benefitsUpdated = await this.prismaService.benefits.update({
      where: { id: +id, edcenso_city_fk: request.user.edcenso_city_fk },
      data: {
        ...UpdateBenefitsDto,
        edcenso_city: cityOptional,
      },
    });

    return benefitsUpdated;
  }

  async remove(request: Request, id: string) {
    const benefit = await this.findOne(request, id);

    if (benefit.canDelete === false) {
      throw new HttpException(
        'Benefits cannot be deleted',
        HttpStatus.FORBIDDEN,
      );
    }

    const transactionResult = await this.prismaService.$transaction(
      async (tx) => {
        const benefitsFounded = await tx.family_benefits.findMany({
          where: {
            benefits_fk: +id,
          },
        });

        if (benefitsFounded.length > 0) {
          throw new HttpException(
            'Benefits cannot be deleted',
            HttpStatus.FORBIDDEN,
          );
        }

        const benefitsDeleted = await tx.benefits.delete({
          where: { id: +id, edcenso_city_fk: request.user.edcenso_city_fk },
        });

        return benefitsDeleted;
      },
    );

    return transactionResult;
  }
}
