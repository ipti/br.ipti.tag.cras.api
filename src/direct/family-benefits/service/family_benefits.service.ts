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
    const transactionResult = await this.prismaService.$transaction(
      async (tx) => {
        const familyBenefitsExists = await tx.family_benefits.findFirst({
          where: {
            family_fk: createFamilyBenefits.family,
            benefits_fk: createFamilyBenefits.benefits,
          },
        });

        if (familyBenefitsExists) {
          throw new HttpException(
            'FamilyBenefits already exists',
            HttpStatus.BAD_REQUEST,
          );
        }

        const createdFamilyBenefits = await tx.family_benefits.create({
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
          },
        });

        return createdFamilyBenefits;
      },
    );

    return transactionResult;
  }

  async findAll(request: Request): Promise<family_benefits[]> {
    const allFamilyBenefits = await this.prismaService.family_benefits.findMany();

    return allFamilyBenefits;
  }

  async findOne(request: Request, id: string): Promise<family_benefits> {
    const family_benefits = await this.prismaService.family_benefits.findUnique(
      {
        where: { id: +id },
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

    const family_benefitsUpdated =
      await this.prismaService.family_benefits.update({
        where: { id: +id },
        data: {
          ...UpdateFamilyBenefitsDto,
          family: familyOptional,
          benefits: benefitsOptional,
        },
      });

    return family_benefitsUpdated;
  }

  async remove(request: Request, id: string) {
    await this.findOne(request, id);

    const family_benefitsDeleted =
      await this.prismaService.family_benefits.delete({
        where: { id: +id },
      });

    return family_benefitsDeleted;
  }
}
