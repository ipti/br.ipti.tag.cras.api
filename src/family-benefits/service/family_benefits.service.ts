import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateFamilyBenefitsDto } from '../dto/create-family_benefits.dto';
import { UpdateFamilyBenefitsDto } from '../dto/update-family_benefits.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { family_benefits } from '@prisma/client';
import { Request } from 'express';
import { optionalKeyValidation } from 'src/utils/optionalKeysValidation';

@Injectable()
export class FamilyBenefitsService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(
    request: Request,
    createFamilyBenefits: CreateFamilyBenefitsDto,
  ): Promise<family_benefits> {
    const createdFamilyBenefits =
      await this.prismaService.family_benefits.create({
        data: {
          ...createFamilyBenefits,
          family: {
            connect: {
              id: createFamilyBenefits.family,
            },
          },
          benefits: {
            connect: {
              id: createFamilyBenefits.benefits,
            },
          },
          edcenso_city: {
            connect: {
              id: request.user.edcenso_city_fk,
            },
          },
        },
      });

    return createdFamilyBenefits;
  }

  async findAll(request: Request): Promise<family_benefits[]> {
    const allFamilyBenefits = await this.prismaService.family_benefits.findMany(
      {
        where: {
          edcenso_city_fk: request.user.edcenso_city_fk,
        },
      },
    );

    return allFamilyBenefits;
  }

  async findOne(request: Request, id: string): Promise<family_benefits> {
    const family_benefits = await this.prismaService.family_benefits.findUnique(
      {
        where: { id: +id, edcenso_city_fk: request.user.edcenso_city_fk },
      },
    );

    if (!family_benefits) {
      throw new HttpException('FamilyBenefits not found', HttpStatus.NOT_FOUND);
    }

    return family_benefits;
  }

  async update(
    request: Request,
    id: string,
    UpdateFamilyBenefitsDto: UpdateFamilyBenefitsDto,
  ) {
    await this.findOne(request, id);

    const familyOptional = optionalKeyValidation(
      UpdateFamilyBenefitsDto.family,
      {
        connect: {
          id: UpdateFamilyBenefitsDto.family,
        },
      },
    );

    const benefitsOptional = optionalKeyValidation(
      UpdateFamilyBenefitsDto.benefits,
      {
        connect: {
          id: UpdateFamilyBenefitsDto.benefits,
        },
      },
    );

    const cityOptional = optionalKeyValidation(request.user.edcenso_city_fk, {
      connect: {
        id: request.user.edcenso_city_fk,
      },
    });

    const family_benefitsUpdated =
      await this.prismaService.family_benefits.update({
        where: { id: +id, edcenso_city_fk: request.user.edcenso_city_fk },
        data: {
          ...UpdateFamilyBenefitsDto,
          family: familyOptional,
          benefits: benefitsOptional,
          edcenso_city: cityOptional,
        },
      });

    return family_benefitsUpdated;
  }

  async remove(request: Request, id: string) {
    await this.findOne(request, id);

    const family_benefitsDeleted =
      await this.prismaService.family_benefits.delete({
        where: { id: +id, edcenso_city_fk: request.user.edcenso_city_fk },
      });

    return family_benefitsDeleted;
  }
}
