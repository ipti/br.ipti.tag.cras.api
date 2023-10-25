import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateBenefitsDto } from '../dto/create-benefits.dto';
import { UpdateBenefitsDto } from '../dto/update-benefits.dto';
import { benefits } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { Request } from 'express';

@Injectable()
export class BenefitsService {

  constructor(
    private readonly prismaService: PrismaService,
  ) {}

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
        edcenso_city: {
          id: request.user.edcenso_city_fk,
        },
      },
    });

    return allBenefits;
  }

  async findOne(request: Request, id: string): Promise<benefits> {

    const benefits = await this.prismaService.benefits.findUnique({
      where: { id: +id, edcenso_city_fk: request.user.edcenso_city_fk },
    });

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

    const benefitsUpdated = await this.prismaService.benefits.update({
      where: { id: +id },
      data: {
        ...UpdateBenefitsDto,
        edcenso_city: {
          connect: {
            id: request.user.edcenso_city_fk,
          },
        },
      },
    });

    return benefitsUpdated;
  }

  async remove(request: Request, id: string) {
    await this.findOne(request, id);

    const benefitsDeleted = await this.prismaService.benefits.delete({
      where: { id: +id },
    });

    return benefitsDeleted;
  }
}
