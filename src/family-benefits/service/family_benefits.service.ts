import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { family_benefits as FamilyBenefits } from '../../sequelize/models/family_benefits';
import { CreateFamilyBenefitsDto } from '../dto/create-family_benefits.dto';
import { UpdateFamilyBenefitsDto } from '../dto/update-family_benefits.dto';

@Injectable()
export class FamilyBenefitsService {
  async create(
    request: Request,
    createFamilyBenefits: CreateFamilyBenefitsDto,
  ): Promise<FamilyBenefits> {
    const dbName = request['dbName'];

    const createdFamilyBenefits = await FamilyBenefits.withSchema(dbName).create({
      ...createFamilyBenefits,
    });

    return createdFamilyBenefits;
  }

  async findAll(request: Request): Promise<FamilyBenefits[]> {
    const dbName = request['dbName'];

    const allFamilyBenefits = await FamilyBenefits.withSchema(dbName).findAll();

    return allFamilyBenefits;
  }

  async findOne(request: Request, id: string): Promise<FamilyBenefits> {
    const dbName = request['dbName'];

    const family_benefits = await FamilyBenefits.withSchema(dbName).findByPk(+id);

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
    const dbName = request['dbName'];

    await this.findOne(request, id);

    const family_benefitsUpdated = await FamilyBenefits.withSchema(dbName).update(
      {
        ...UpdateFamilyBenefitsDto,
      },
      {
        where: { id: +id },
      },
    );

    return family_benefitsUpdated;
  }

  async remove(request: Request, id: string) {
    await this.findOne(request, id);

    const dbName = request['dbName'];

    const family_benefitsDeleted = await FamilyBenefits.withSchema(dbName).destroy({
      where: { id: +id },
    });

    return family_benefitsDeleted;
  }
}
