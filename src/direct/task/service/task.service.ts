import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import { CreateTaskDto } from '../dto/create-task.dto';
import { UpdateTaskDto } from '../dto/update-task.dto';
import { AttendanceService } from '../../attendance/service/attendance.service';
import { Request } from 'express';
import { PrismaService } from 'src/prisma/prisma.service';
import { task } from '@prisma/client';
import { optionalKeyValidation } from 'src/utils/optionalKeysValidation';

@Injectable()
export class TaskService {
  attendance: AttendanceService;

  constructor(
    private readonly prismaService: PrismaService,
    @Inject(forwardRef(() => AttendanceService))
    attendanceService: AttendanceService,
  ) {
    this.attendance = attendanceService;
  }

  async create(request: Request, createTask: CreateTaskDto): Promise<task> {
    const createdTask = await this.prismaService.task.create({
      data: {
        ...createTask,
        edcenso_city: {
          connect: {
            id: request.user.edcenso_city_fk,
          },
        },
      },
    });

    return createdTask;
  }

  async findAll(request: Request): Promise<task[]> {
    const allTask = await this.prismaService.task.findMany({
      where: {
        edcenso_city_fk: request.user.edcenso_city_fk,
      },
      orderBy: {
        id: 'desc',
      },
    });

    return allTask;
  }

  async findOne(request: Request, id: string): Promise<task> {
    const task = await this.prismaService.task.findUnique({
      where: { id: +id, edcenso_city_fk: request.user.edcenso_city_fk },
    });

    if (!task) {
      throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
    }

    return task;
  }

  async update(request: Request, id: string, UpdateTaskDto: UpdateTaskDto) {
    await this.findOne(request, id);

    const cityOptional = optionalKeyValidation(request.user.edcenso_city_fk, {
      connect: {
        id: request.user.edcenso_city_fk,
      },
    });

    const taskUpdated = await this.prismaService.task.update({
      where: { id: +id, edcenso_city_fk: request.user.edcenso_city_fk },
      data: {
        ...UpdateTaskDto,
        edcenso_city: cityOptional,
      },
    });

    return taskUpdated;
  }

  async remove(request: Request, id: string) {
    const task = await this.findOne(request, id);

    if (task.canDelete === false) {
      throw new HttpException('Task cannot be deleted', HttpStatus.BAD_REQUEST);
    }

    const taskDeleted = await this.prismaService.task.delete({
      where: { id: +id, edcenso_city_fk: request.user.edcenso_city_fk },
    });

    return taskDeleted;
  }
}
