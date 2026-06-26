import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import { CreateUserIdentifyDto } from '../dto/create-user_identify.dto';
import { UpdateUserIdentifyDto } from '../dto/update-user_identify.dto';
import { FamilyService } from '../../family/service/family.service';
import { VulnerabilityService } from '../../vulnerability/service/vulnerability.service';
import { Request } from 'express';
import { user_identify } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { optionalKeyValidation } from 'src/utils/optionalKeysValidation';

@Injectable()
export class UserIdentifyService {
  family: FamilyService;
  vulnerability: VulnerabilityService;

  constructor(
    private readonly prismaService: PrismaService,
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
  ): Promise<user_identify> {

    if (createUserIdentify.family) {
      const family = await this.family.findOne(
        request,
        createUserIdentify.family?.toString(),
      );

      if (!family) {
        throw new HttpException('Family not found', HttpStatus.NOT_FOUND);
      }

      const familyOptional = optionalKeyValidation(createUserIdentify.family, {
        connect: {
          id: createUserIdentify.family,
        },
      });

      const createdUserIdentify = await this.prismaService.user_identify.create({
        data: {
          ...createUserIdentify,
          family: familyOptional,
        },
      });

      return createdUserIdentify;
    }


    const familyOptional = optionalKeyValidation(createUserIdentify.family, {
      connect: {
        id: createUserIdentify.family,
      },
    });




    const createdUser = await this.prismaService.user_identify.create({
      data: {
        ...createUserIdentify,
      },
      ...familyOptional
    });
    return createdUser
  }

  async findAll(request: Request): Promise<user_identify[]> {
    const allUserIdentify = await this.prismaService.user_identify.findMany();

    return allUserIdentify;
  }

  async findOne(request: Request, id: string): Promise<user_identify> {
    const user_identify = await this.prismaService.user_identify.findUnique({
      where: {
        id: +id,
      },
    });

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
    await this.findOne(request, id);

    const familyOptional = optionalKeyValidation(UpdateUserIdentifyDto.family, {
      connect: {
        id: UpdateUserIdentifyDto.family,
      },
    });

    const user_identifyUpdated = await this.prismaService.user_identify.update({
      where: { id: +id },
      data: {
        ...UpdateUserIdentifyDto,
        family: familyOptional,
      },
    });

    return user_identifyUpdated;
  }

  async remove(request: Request, id: string) {
    await this.findOne(request, id);

    const user_identifyDeleted = await this.prismaService.user_identify.delete({
      where: { id: +id },
    });

    return user_identifyDeleted;
  }
}
