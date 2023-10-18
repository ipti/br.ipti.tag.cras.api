import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import { task as Task } from '../../sequelize/models/task';
import { CreateTaskDto } from '../dto/create-task.dto';
import { UpdateTaskDto } from '../dto/update-task.dto';
import { AttendanceService } from '../../attendance/service/attendance.service';

@Injectable()
export class TaskService {
  attendance: AttendanceService;

  constructor(
    @Inject(forwardRef(() => AttendanceService))
    attendanceService: AttendanceService,
  ) {
    this.attendance = attendanceService;
  }

  async create(request: Request, createTask: CreateTaskDto): Promise<Task> {
    const dbName = request['dbName'];

    const createdTask = await Task.withSchema(dbName).create({
      ...createTask,
    });

    return createdTask;
  }

  async findAll(request: Request): Promise<Task[]> {
    const dbName = request['dbName'];

    const allTask = await Task.withSchema(dbName).findAll();

    return allTask;
  }

  async findOne(request: Request, id: string): Promise<Task> {
    const dbName = request['dbName'];

    const task = await Task.withSchema(dbName).findByPk(+id);

    if (!task) {
      throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
    }

    return task;
  }

  async update(request: Request, id: string, UpdateTaskDto: UpdateTaskDto) {
    const dbName = request['dbName'];

    await this.findOne(request, id);

    const taskUpdated = await Task.withSchema(dbName).update(
      {
        ...UpdateTaskDto,
      },
      {
        where: { id: +id },
      },
    );

    return taskUpdated;
  }

  async remove(request: Request, id: string) {
    await this.findOne(request, id);

    const dbName = request['dbName'];

    const taskDeleted = await Task.withSchema(dbName).destroy({
      where: { id: +id },
    });

    return taskDeleted;
  }
}
