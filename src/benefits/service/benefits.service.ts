import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { benefits as Benefits } from '../../sequelize/models/benefits';
import { CreateBenefitsDto } from '../dto/create-benefits.dto';
import { UpdateBenefitsDto } from '../dto/update-benefits.dto';

@Injectable()
export class BenefitsService {
  async create(
    request: Request,
    createBenefits: CreateBenefitsDto,
  ): Promise<Benefits> {
    const dbName = request['dbName'];

    const createdBenefits = await Benefits.withSchema(dbName).create({
      ...createBenefits,
    });

    return createdBenefits;
  }

  async findAll(request: Request): Promise<Benefits[]> {
    const dbName = request['dbName'];

    const allBenefits = await Benefits.withSchema(dbName).findAll();

    return allBenefits;
  }

  async findOne(request: Request, id: string): Promise<Benefits> {
    const dbName = request['dbName'];

    const benefits = await Benefits.withSchema(dbName).findByPk(+id);

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
    const dbName = request['dbName'];

    await this.findOne(request, id);

    const benefitsUpdated = await Benefits.withSchema(dbName).update(
      {
        ...UpdateBenefitsDto,
      },
      {
        where: { id: +id },
      },
    );

    return benefitsUpdated;
  }

  async remove(request: Request, id: string) {
    await this.findOne(request, id);

    const dbName = request['dbName'];

    const benefitsDeleted = await Benefits.withSchema(dbName).destroy({
      where: { id: +id },
    });

    return benefitsDeleted;
  }
}
