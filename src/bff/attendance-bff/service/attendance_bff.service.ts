import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AttendanceBffService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAttendance(
    request: Request,
    attendance_unity_fk: string,
  ): Promise<any> {
    var attendance;

    if (attendance_unity_fk !== undefined) {
      attendance = await this.prismaService.attendance.findMany({
        where: {
          attendance_unity_fk: +attendance_unity_fk,
        },
        include: {
          task: true,
          technician: true,
        },
        orderBy: {
          id: 'asc',
        },
      });
    } else if (request.user.attendance_unity_fk !== null) {
      attendance = await this.prismaService.attendance.findMany({
        where: {
          attendance_unity_fk: request.user.attendance_unity_fk,
        },
        include: {
          task: true,
          technician: true,
        },
        orderBy: {
          id: 'asc',
        },
      });
    } else {
      attendance = await this.prismaService.attendance.findMany({
        where: {
          edcenso_city_fk: request.user.edcenso_city_fk,
        },
        include: {
          task: true,
          technician: true,
        },
        orderBy: {
          id: 'asc',
        },
      });
    }

    return attendance;
  }
}
