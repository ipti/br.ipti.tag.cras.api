import { HttpException, HttpStatus, Inject, Injectable, forwardRef } from '@nestjs/common';
import { family as Family } from '../../sequelize/models/family';
import { CreateFamilyDto } from '../dto/create-family.dto';
import { UpdateFamilyDto } from '../dto/update-family.dto';
import { UserIdentifyService } from '../../user-identify/service/user_identify.service';
import { AddressService } from '../../address/service/address.service';
import { BenefitsService } from '../../benefits/service/benefits.service';

@Injectable()
export class FamilyService {

  user_identify: UserIdentifyService;
  address: AddressService;
  benefits: BenefitsService;

  constructor(
    @Inject(forwardRef(() => UserIdentifyService))
    userIdentifyService: UserIdentifyService,
    addressService: AddressService,
    benefitsService: BenefitsService,
  ){
    this.user_identify = userIdentifyService;
    this.address = addressService;
    this.benefits = benefitsService;
  }

  async create(
    request: Request,
    createFamily: CreateFamilyDto,
  ): Promise<Family> {
    const dbName = request['dbName'];

    const user = await this.user_identify.findOne(request, createFamily.family_representative_fk.toString());

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const address = await this.address.findOne(request, createFamily.address_fk.toString());

    if (!address) {
      throw new HttpException('Address not found', HttpStatus.NOT_FOUND);
    }

    const benefits = await this.benefits.findOne(request, createFamily.benefit_fk.toString());

    if (!benefits) {
      throw new HttpException('Benefits not found', HttpStatus.NOT_FOUND);
    }

    const createdFamily = await Family.withSchema(dbName).create({
      ...createFamily,
    });

    return createdFamily;
  }

  async findAll(request: Request): Promise<Family[]> {
    const dbName = request['dbName'];

    const allFamily = await Family.withSchema(dbName).findAll();

    return allFamily;
  }

  async findOne(request: Request, id: string): Promise<Family> {
    const dbName = request['dbName'];

    const family = await Family.withSchema(dbName).findByPk(+id);

    if (!family) {
      throw new HttpException('Family not found', HttpStatus.NOT_FOUND);
    }

    return family;
  }

  async update(
    request: Request,
    id: string,
    UpdateFamilyDto: UpdateFamilyDto,
  ) {
    const dbName = request['dbName'];

    await this.findOne(request, id);

    const familyUpdated = await Family.withSchema(dbName).update(
      {
        ...UpdateFamilyDto,
      },
      {
        where: { id: +id },
      },
    );

    return familyUpdated;
  }

  async remove(request: Request, id: string) {
    await this.findOne(request, id);

    const dbName = request['dbName'];

    const familyDeleted = await Family.withSchema(dbName).destroy({
      where: { id: +id },
    });

    return familyDeleted;
  }
}
