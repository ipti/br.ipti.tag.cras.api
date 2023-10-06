import { HttpException, HttpStatus, Inject, Injectable, forwardRef } from '@nestjs/common';
import { user_identify as UserIdentify } from '../../sequelize/models/user_identify';
import { CreateUserIdentifyDto } from '../dto/create-user_identify.dto';
import { UpdateUserIdentifyDto } from '../dto/update-user_identify.dto';
import { FamilyService } from '../../family/service/family.service';
import { VulnerabilityService } from '../../vulnerability/service/vulnerability.service';

@Injectable()
export class UserIdentifyService {
  family: FamilyService;
  vulnerability: VulnerabilityService;

  constructor(
    @Inject(forwardRef(() => FamilyService))
    familyService: FamilyService,
    vulnerabilityService: VulnerabilityService,
  ) {
    this.family = familyService;
    this.vulnerability = vulnerabilityService;
  }

  async create(
    request: Request,
    createUserIdentify: CreateUserIdentifyDto,
  ): Promise<UserIdentify> {
    const dbName = request['dbName'];

    const family = await this.family.findOne(
      request,
      createUserIdentify.family_fk.toString(),
    );

    if (!family) {
      throw new HttpException('Family not found', HttpStatus.NOT_FOUND);
    }

    const vulnerability = await this.vulnerability.findOne(
      request,
      createUserIdentify.vulnerability_fk.toString(),
    );

    if (!vulnerability) {
      throw new HttpException('Vulnerability not found', HttpStatus.NOT_FOUND);
    }

    const createdUserIdentify = await UserIdentify.withSchema(dbName).create({
      ...createUserIdentify,
    });

    return createdUserIdentify;
  }

  async findAll(request: Request): Promise<UserIdentify[]> {
    const dbName = request['dbName'];

    const allUserIdentify = await UserIdentify.withSchema(dbName).findAll();

    return allUserIdentify;
  }

  async findOne(request: Request, id: string): Promise<UserIdentify> {
    const dbName = request['dbName'];

    const user_identify = await UserIdentify.withSchema(dbName).findByPk(+id);

    if (!user_identify) {
      throw new HttpException('UserIdentify not found', HttpStatus.NOT_FOUND);
    }

    return user_identify;
  }

  async update(
    request: Request,
    id: string,
    UpdateUserIdentifyDto: UpdateUserIdentifyDto,
  ) {
    const dbName = request['dbName'];

    await this.findOne(request, id);

    const user_identifyUpdated = await UserIdentify.withSchema(dbName).update(
      {
        ...UpdateUserIdentifyDto,
      },
      {
        where: { id: +id },
      },
    );

    return user_identifyUpdated;
  }

  async remove(request: Request, id: string) {
    await this.findOne(request, id);

    const dbName = request['dbName'];

    const user_identifyDeleted = await UserIdentify.withSchema(dbName).destroy({
      where: { id: +id },
    });

    return user_identifyDeleted;
  }
}
