import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtPayload } from 'src/utils/jwt.interface';
import { CreateMultiFamilyAttendanceDto } from '../dto/create-multifamilyattendance.dto';
import { TechnicianService } from 'src/direct/technician/service/technician.service';
import { TaskService } from 'src/direct/task/service/task.service';
import { AttendanceUnityService } from 'src/direct/attendance-unity/service/attendance_unity.service';

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
    request: Request,
    createMultiFamilyAttendanceDTO: CreateMultiFamilyAttendanceDto,
  ) {
    const transactionResult = await this.prismaService.$transaction(
      async (tx) => {
        var technician;

        if (createMultiFamilyAttendanceDTO.technician !== undefined) {
          technician = await tx.technician.findUnique({
            where: {
              id: createMultiFamilyAttendanceDTO.technician,
            },
          });
        } else {
          technician = await tx.technician.findUnique({
            where: {
              user_fk: request.user.id,
            },
          });
        }

        var attendance_unity;

        if (createMultiFamilyAttendanceDTO.attendance_unity !== undefined) {
          attendance_unity = await tx.attendance_unity.findUnique({
            where: {
              id: createMultiFamilyAttendanceDTO.attendance_unity,
            },
          });
        } else {
          attendance_unity = await tx.attendance_unity.findUnique({
            where: {
              id: request.user.attendance_unity_fk,
            },
          });
        }

        const task = await tx.task.findUnique({
          where: {
            id: createMultiFamilyAttendanceDTO.task,
          },
        });

        if (!task) {
          throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
        }

        const attendance = await tx.attendance.create({
          data: {
            technician: {
              connect: {
                id: technician.id,
              },
            },
            attendance_unity: {
              connect: {
                id: attendance_unity.id,
              },
            },
            task: {
              connect: {
                id: task.id,
              },
            },
            edcenso_city: {
              connect: {
                id: request.user.edcenso_city_fk,
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
                  id: request.user.edcenso_city_fk,
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

  async getGroupAttendance(request: Request, attendance_unity_fk: string) {
    var attendances = [];

    if (attendance_unity_fk !== undefined) {
      attendances = await this.prismaService.attendance.findMany({
        where: {
          attendance_unity_fk: +attendance_unity_fk,
        },
        include: {
          group_attendance: {
            select: {
              family: {
                select: {
                  id: true,
                  family_representative_fk: true,
                  user_identify: true,
                },
              },
            },
          },
        },
        orderBy: {
          id: 'desc',
        },
      });
    } else if (request.user.attendance_unity_fk !== null) {
      attendances = await this.prismaService.attendance.findMany({
        where: {
          attendance_unity_fk: request.user.attendance_unity_fk,
        },
        include: {
          group_attendance: {
            select: {
              family: {
                select: {
                  id: true,
                  family_representative_fk: true,
                  user_identify: true,
                },
              },
            },
          },
        },
        orderBy: {
          id: 'desc',
        },
      });
    } else {
      attendances = await this.prismaService.attendance.findMany({
        where: {
          edcenso_city_fk: request.user.edcenso_city_fk,
        },
        include: {
          group_attendance: {
            select: {
              family: {
                select: {
                  id: true,
                  family_representative_fk: true,
                  user_identify: true,
                },
              },
            },
          },
        },
        orderBy: {
          id: 'desc',
        },
      });
    }

    attendances = attendances.filter(
      (attendance) => attendance.group_attendance.length > 0,
    );

    attendances = attendances.map((attendance) => {
      attendance.group_attendance = attendance.group_attendance.map(
        (group_attendance) => {
          group_attendance.family.user_identify =
            group_attendance.family.user_identify.find(
              (user_identify) =>
                user_identify.id ===
                group_attendance.family.family_representative_fk,
            );

          return group_attendance;
        },
      );

      return attendance;
    });

    return attendances;
  }

  async getOneGroupAttendance(request: Request, id: string) {
    var attendance: any = await this.prismaService.attendance.findUnique({
      where: {
        id: +id,
      },
      include: {
        group_attendance: {
          select: {
            family: {
              select: {
                id: true,
                family_representative_fk: true,
                user_identify: true,
              },
            },
          },
        },
      },
    });

    attendance.group_attendance = attendance.group_attendance.map(
      (group_attendance) => {
        group_attendance.family.user_identify =
          group_attendance.family.user_identify.find(
            (user_identify) =>
              user_identify.id ===
              group_attendance.family.family_representative_fk,
          );

        return group_attendance;
      },
    );

    return attendance;
  }
}
