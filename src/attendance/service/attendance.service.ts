import { HttpException, HttpStatus, Inject, Injectable, forwardRef } from '@nestjs/common';
import { CreateAttendanceDto } from '../dto/create-attendance.dto';
import { UpdateAttendanceDto } from '../dto/update-attendance.dto';
import { UserIdentifyService } from '../../user-identify/service/user_identify.service';
import { TechnicianService } from '../../technician/service/technician.service';
import { TaskService } from '../../task/service/task.service';
import { AttendanceUnityService } from '../../attendance-unity/service/attendance_unity.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { attendance } from '@prisma/client';
import { Request } from 'express';

@Injectable()
export class AttendanceService {

  user_identify: UserIdentifyService;
  technician: TechnicianService;
  task: TaskService;
  attendance_unity: AttendanceUnityService;

  constructor(
    private readonly prismaService: PrismaService,
    userIdentifyService: UserIdentifyService,
    technicianService: TechnicianService,
    @Inject(forwardRef(() => TaskService))
    taskService: TaskService,
    attendanceUnityService: AttendanceUnityService,
  ){
    this.user_identify = userIdentifyService;
    this.technician = technicianService;
    this.task = taskService;
    this.attendance_unity = attendanceUnityService;
  }

  async create(
    request: Request,
    createAttendance: CreateAttendanceDto,
  ): Promise<attendance> {

    const user_identify = await this.user_identify.findOne(request, createAttendance.user_identify.toString());

    if (!user_identify) {
      throw new HttpException('UserIdentify not found', HttpStatus.NOT_FOUND);
    }

    const technician = await this.technician.findOne(request, createAttendance.technician.toString());

    if (!technician) {
      throw new HttpException('Technician not found', HttpStatus.NOT_FOUND);
    }

    const task = await this.task.findOne(request, createAttendance.task.toString());

    if (!task) {
      throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
    }

    const attendance_unity = await this.attendance_unity.findOne(request, createAttendance.attendance_unity.toString());

    if (!attendance_unity) {
      throw new HttpException('AttendanceUnity not found', HttpStatus.NOT_FOUND);
    }

    const createdAttendance = await this.prismaService.attendance.create({
      data: {
        ...createAttendance,
        user_identify: {
          connect: {
            id: user_identify.id,
          },
        },
        technician: {
          connect: {
            id: technician.id,
          },
        },
        task: {
          connect: {
            id: task.id,
          },
        },
        attendance_unity: {
          connect: {
            id: attendance_unity.id,
          },
        },
        edcenso_city: {
          connect: {
            id: attendance_unity.edcenso_city_fk,
          },
        },
      },
    });

    return createdAttendance;
  }

  async findAll(request: Request): Promise<attendance[]> {

    const allAttendance = await this.prismaService.attendance.findMany({
      where: { edcenso_city_fk: request.user.edcenso_city_fk },
    });

    return allAttendance;
  }

  async findOne(request: Request, id: string): Promise<attendance> {

    const attendance = await this.prismaService.attendance.findUnique({
      where: { id: +id, edcenso_city_fk: request.user.edcenso_city_fk },
    });

    if (!attendance) {
      throw new HttpException('Attendance not found', HttpStatus.NOT_FOUND);
    }

    return attendance;
  }

  async update(
    request: Request,
    id: string,
    UpdateAttendanceDto: UpdateAttendanceDto,
  ): Promise<attendance> {

    await this.findOne(request, id);

    const attendanceUpdated = await this.prismaService.attendance.update({
      where: { id: +id },
      data: {
        ...UpdateAttendanceDto,
        user_identify: {
          connect: {
            id: UpdateAttendanceDto.user_identify,
          },
        },
        technician: {
          connect: {
            id: UpdateAttendanceDto.technician,
          },
        },
        task: {
          connect: {
            id: UpdateAttendanceDto.task,
          },
        },
        attendance_unity: {
          connect: {
            id: UpdateAttendanceDto.attendance_unity,
          },
        },
        edcenso_city: {
          connect: {
            id: request.user.edcenso_city_fk,
          },
        },
      },
    });

    return attendanceUpdated;
  }

  async remove(request: Request, id: string): Promise<attendance> {
    await this.findOne(request, id);

    const attendanceDeleted = await this.prismaService.attendance.delete({
      where: { id: +id },
    });

    return attendanceDeleted;
  }
}
