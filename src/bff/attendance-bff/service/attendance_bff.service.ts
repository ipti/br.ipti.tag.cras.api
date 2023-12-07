import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtPayload } from 'src/utils/jwt.interface';
import { CreateMultiFamilyAttendanceDto } from '../dto/create-multifamilyattendance.dto';

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
          id: 'desc',
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
          id: 'desc',
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
          id: 'desc',
        },
      });
    }

    return attendance;
  }

  async createMultiFamilyAttendance(
    user: JwtPayload,
    createMultiFamilyAttendanceDTO: CreateMultiFamilyAttendanceDto,
  ) {
    const transactionResult = await this.prismaService.$transaction(
      async (tx) => {
        const technician = await tx.technician.findUnique({
          where: {
            user_fk: user.id,
          },
        });

        const attendance = await tx.attendance.create({
          data: {
            technician: {
              connect: {
                id: technician.id,
              },
            },
            attendance_unity: {
              connect: {
                id: user.attendance_unity_fk,
              },
            },
            task: {
              connect: {
                id: createMultiFamilyAttendanceDTO.task,
              },
            },
            edcenso_city: {
              connect: {
                id: user.edcenso_city_fk,
              },
            },
            description: createMultiFamilyAttendanceDTO.description,
            date: createMultiFamilyAttendanceDTO.date,
            result: createMultiFamilyAttendanceDTO.result,
            providence: createMultiFamilyAttendanceDTO.providence,
            solicitation: createMultiFamilyAttendanceDTO.solicitation,
          },
        });

        for (const familyId of createMultiFamilyAttendanceDTO.families) {
          await tx.group_attendance.create({
            data: {
              attendance: {
                connect: {
                  id: attendance.id,
                },
              },
              family: {
                connect: {
                  id: familyId,
                },
              },
              edcenso_city: {
                connect: {
                  id: user.edcenso_city_fk,
                },
              },
            },
          });
        }

        return attendance;
      },
    );

    return transactionResult;
  }
}
