import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAttendanceUnityDto } from '../dto/create-attendance_unity.dto';
import { UpdateAttendanceUnityDto } from '../dto/update-attendance_unity.dto';
import { UserService } from '../../user/service/user.service';
import { Request } from 'express';
import { PrismaService } from 'src/prisma/prisma.service';
import { attendance_unity } from '@prisma/client';

@Injectable()
export class AttendanceUnityService {
  user: UserService;

  constructor(
    private readonly prismaService: PrismaService,
    userService: UserService,
  ) {
    this.user = userService;
  }

  async create(
    request: Request,
    createAttendanceUnity: CreateAttendanceUnityDto,
  ): Promise<attendance_unity> {
    const createdAttendanceUnity =
      await this.prismaService.attendance_unity.create({
        data: {
          ...createAttendanceUnity,
          address: {
            connect: {
              id: createAttendanceUnity.address,
            },
          },
          edcenso_city: {
            connect: {
              id: request.user.edcenso_city_fk,
            },
          },
        },
      });

    return createdAttendanceUnity;
  }

  async findAll(request: Request): Promise<attendance_unity[]> {
    const allAttendanceUnity =
      await this.prismaService.attendance_unity.findMany({
        where: {
          edcenso_city: {
            id: request.user.edcenso_city_fk,
          },
        },
      });

    return allAttendanceUnity;
  }

  async findOne(request: Request, id: string): Promise<attendance_unity> {
    const attendance_unity =
      await this.prismaService.attendance_unity.findUnique({
        where: { id: +id, edcenso_city_fk: request.user.edcenso_city_fk },
      });

    if (!attendance_unity) {
      throw new HttpException(
        'AttendanceUnity not found',
        HttpStatus.NOT_FOUND,
      );
    }

    return attendance_unity;
  }

  async update(
    request: Request,
    id: string,
    UpdateAttendanceUnityDto: UpdateAttendanceUnityDto,
  ) {
    await this.findOne(request, id);

    const attendance_unityUpdated =
      await this.prismaService.attendance_unity.update({
        where: { id: +id },
        data: {
          ...UpdateAttendanceUnityDto,
          address: {
            connect: {
              id: UpdateAttendanceUnityDto.address,
            },
          },
        },
      });

    return attendance_unityUpdated;
  }

  async remove(request: Request, id: string) {
    await this.findOne(request, id);

    const attendance_unityDeleted =
      await this.prismaService.attendance_unity.delete({
        where: { id: +id },
      });

    return attendance_unityDeleted;
  }
}
