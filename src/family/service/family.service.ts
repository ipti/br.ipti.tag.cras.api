import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import { CreateFamilyDto } from '../dto/create-family.dto';
import { UpdateFamilyDto } from '../dto/update-family.dto';
import { UserIdentifyService } from '../../user-identify/service/user_identify.service';
import { AddressService } from '../../address/service/address.service';
import { BenefitsService } from '../../benefits/service/benefits.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { family } from '@prisma/client';
import { Request } from 'express';
import { optionalKeyValidation } from 'src/utils/optionalKeysValidation';

@Injectable()
export class FamilyService {
  user_identify: UserIdentifyService;
  address: AddressService;
  benefits: BenefitsService;

  constructor(
    private readonly prismaService: PrismaService,
    @Inject(forwardRef(() => UserIdentifyService))
    userIdentifyService: UserIdentifyService,
    addressService: AddressService,
    benefitsService: BenefitsService,
  ) {
    this.user_identify = userIdentifyService;
    this.address = addressService;
    this.benefits = benefitsService;
  }

  async create(
    request: Request,
    createFamily: CreateFamilyDto,
  ): Promise<family> {
    const user = await this.user_identify.findOne(
      request,
      createFamily.family_representative_fk.toString(),
    );

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const address = await this.address.findOne(
      request,
      createFamily.address.toString(),
    );

    if (!address) {
      throw new HttpException('Address not found', HttpStatus.NOT_FOUND);
    }

    const createdFamily = await this.prismaService.family.create({
      data: {
        ...createFamily,
        address: {
          connect: {
            id: address.id,
          },
        },
        attendance_unity: {
          connect: {
            id: createFamily.attendance_unity,
          },
        },
        edcenso_city: {
          connect: {
            id: request.user.edcenso_city_fk,
          },
        },
        vulnerability: {
          connect: {
            id: createFamily.vulnerability,
          },
        },
      },
    });

    return createdFamily;
  }

  async findAll(request: Request): Promise<family[]> {
    const allFamily = await this.prismaService.family.findMany({
      where: {
        edcenso_city_fk: request.user.edcenso_city_fk,
      },
    });

    return allFamily;
  }

  async findOne(request: Request, id: string): Promise<family> {
    const family = await this.prismaService.family.findUnique({
      where: {
        id: +id,
        edcenso_city_fk: request.user.edcenso_city_fk,
      },
    });

    if (!family) {
      throw new HttpException('Family not found', HttpStatus.NOT_FOUND);
    }

    return family;
  }

  async update(request: Request, id: string, UpdateFamilyDto: UpdateFamilyDto) {
    await this.findOne(request, id);

    const address = await this.address.findOne(
      request,
      UpdateFamilyDto.address.toString(),
    );

    const addressOptional = optionalKeyValidation(address.id, {
      connect: {
        id: address.id,
      },
    });

    const attendanceUnityOptional = optionalKeyValidation(
      UpdateFamilyDto.attendance_unity,
      {
        connect: {
          id: UpdateFamilyDto.attendance_unity,
        },
      },
    );

    const cityOptional = optionalKeyValidation(request.user.edcenso_city_fk, {
      connect: {
        id: request.user.edcenso_city_fk,
      },
    });

    const vulnerabilityOptional = optionalKeyValidation(
      UpdateFamilyDto.vulnerability,
      {
        connect: {
          id: UpdateFamilyDto.vulnerability,
        },
      },
    );

    const familyUpdated = await this.prismaService.family.update({
      where: { id: +id, edcenso_city_fk: request.user.edcenso_city_fk },
      data: {
        ...UpdateFamilyDto,
        address: addressOptional,
        attendance_unity: attendanceUnityOptional,
        edcenso_city: cityOptional,
        vulnerability: vulnerabilityOptional,
      },
    });

    return familyUpdated;
  }

  async remove(request: Request, id: string) {
    await this.findOne(request, id);

    const familyDeleted = await this.prismaService.family.delete({
      where: { id: +id, edcenso_city_fk: request.user.edcenso_city_fk },
    });

    return familyDeleted;
  }
}
