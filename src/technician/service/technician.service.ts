import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTechnicianDto } from '../dto/create-technician.dto';
import { UpdateTechnicianDto } from '../dto/update-technician.dto';
import { UserService } from '../../user/service/user.service';
import { Request } from 'express';
import { technician } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { optionalKeyValidation } from 'src/utils/optionalKeysValidation';

@Injectable()
export class TechnicianService {
  user: UserService;

  constructor(
    private readonly prismaService: PrismaService,
    userService: UserService,
  ) {
    this.user = userService;
  }

  async create(
    request: Request,
    createTechnician: CreateTechnicianDto,
  ): Promise<technician> {
    if (createTechnician.user) {
      const user = await this.user.findOne(
        request,
        createTechnician.user.toString(),
      );

      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
    }

    const isValidTechnician = await this.prismaService.technician.findUnique({
      where: {
        user_fk: createTechnician.user,
      },
    });

    if (isValidTechnician) {
      throw new HttpException(
        'Technician with this user already exists',
        HttpStatus.CONFLICT,
      );
    }

    const userOptional = optionalKeyValidation(createTechnician.user, {
      connect: {
        id: createTechnician.user,
      },
    });

    const createdTechnician = await this.prismaService.technician.create({
      data: {
        ...createTechnician,
        edcenso_city: {
          connect: {
            id: request.user.edcenso_city_fk,
          },
        },
        attendance_unity: {
          connect: {
            id: createTechnician.attendance_unity,
          },
        },
        user: userOptional,
      },
    });

    return createdTechnician;
  }

  async findAll(request: Request): Promise<technician[]> {
    const allTechnician = await this.prismaService.technician.findMany({
      where: {
        edcenso_city_fk: request.user.edcenso_city_fk,
      },
    });

    return allTechnician;
  }

  async findOne(request: Request, id: string): Promise<technician> {
    const technician = await this.prismaService.technician.findUnique({
      where: { id: +id, edcenso_city_fk: request.user.edcenso_city_fk },
    });

    if (!technician) {
      throw new HttpException('Technician not found', HttpStatus.NOT_FOUND);
    }

    return technician;
  }

  async update(
    request: Request,
    id: string,
    UpdateTechnicianDto: UpdateTechnicianDto,
  ) {
    await this.findOne(request, id);

    const userOptional = optionalKeyValidation(UpdateTechnicianDto.user, {
      connect: {
        id: UpdateTechnicianDto.user,
      },
    });

    const cityOptional = optionalKeyValidation(request.user.edcenso_city_fk, {
      connect: {
        id: request.user.edcenso_city_fk,
      },
    });

    const attendance_unityOptional = optionalKeyValidation(
      UpdateTechnicianDto.attendance_unity,
      {
        connect: {
          id: UpdateTechnicianDto.attendance_unity,
        },
      },
    );

    const technicianUpdated = await this.prismaService.technician.update({
      where: { id: +id, edcenso_city_fk: request.user.edcenso_city_fk },
      data: {
        ...UpdateTechnicianDto,
        edcenso_city: cityOptional,
        user: userOptional,
        attendance_unity: attendance_unityOptional,
      },
    });

    return technicianUpdated;
  }

  async remove(request: Request, id: string) {
    await this.findOne(request, id);

    const technicianDeleted = await this.prismaService.technician.delete({
      where: { id: +id, edcenso_city_fk: request.user.edcenso_city_fk },
    });

    return technicianDeleted;
  }
}
