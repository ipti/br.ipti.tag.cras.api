import { HttpException, HttpStatus, Inject, Injectable, forwardRef } from '@nestjs/common';
import { attendance as Attendance } from '../../sequelize/models/attendance';
import { CreateAttendanceDto } from '../dto/create-attendance.dto';
import { UpdateAttendanceDto } from '../dto/update-attendance.dto';
import { UserIdentifyService } from '../../user-identify/service/user_identify.service';
import { TechnicianService } from '../../technician/service/technician.service';
import { TaskService } from '../../task/service/task.service';
import { AttendanceUnityService } from '../../attendance-unity/service/attendance_unity.service';

@Injectable()
export class AttendanceService {

  user_identify: UserIdentifyService;
  technician: TechnicianService;
  task: TaskService;
  attendance_unity: AttendanceUnityService;

  constructor(
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
  ): Promise<Attendance> {
    const dbName = request['dbName'];

    const user_identify = await this.user_identify.findOne(request, createAttendance.user_identify_fk.toString());

    if (!user_identify) {
      throw new HttpException('UserIdentify not found', HttpStatus.NOT_FOUND);
    }

    const technician = await this.technician.findOne(request, createAttendance.technician_fk.toString());

    if (!technician) {
      throw new HttpException('Technician not found', HttpStatus.NOT_FOUND);
    }

    const task = await this.task.findOne(request, createAttendance.task_fk.toString());

    if (!task) {
      throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
    }

    const attendance_unity = await this.attendance_unity.findOne(request, createAttendance.attendance_unity_fk.toString());

    if (!attendance_unity) {
      throw new HttpException('AttendanceUnity not found', HttpStatus.NOT_FOUND);
    }

    const isAttendanceValid = await Attendance.withSchema(dbName).findOne({
      where: {
        task_fk: createAttendance.task_fk,
      },
    });

    if (isAttendanceValid) {
      throw new HttpException('Attendance with this task already exists', HttpStatus.CONFLICT);
    }

    const createdAttendance = await Attendance.withSchema(dbName).create({
      ...createAttendance,
    });

    return createdAttendance;
  }

  async findAll(request: Request): Promise<Attendance[]> {
    const dbName = request['dbName'];

    const allAttendance = await Attendance.withSchema(dbName).findAll();

    return allAttendance;
  }

  async findOne(request: Request, id: string): Promise<Attendance> {
    const dbName = request['dbName'];

    const attendance = await Attendance.withSchema(dbName).findByPk(+id);

    if (!attendance) {
      throw new HttpException('Attendance not found', HttpStatus.NOT_FOUND);
    }

    return attendance;
  }

  async update(
    request: Request,
    id: string,
    UpdateAttendanceDto: UpdateAttendanceDto,
  ) {
    const dbName = request['dbName'];

    await this.findOne(request, id);

    const attendanceUpdated = await Attendance.withSchema(dbName).update(
      {
        ...UpdateAttendanceDto,
      },
      {
        where: { id: +id },
      },
    );

    return attendanceUpdated;
  }

  async remove(request: Request, id: string) {
    await this.findOne(request, id);

    const dbName = request['dbName'];

    const attendanceDeleted = await Attendance.withSchema(dbName).destroy({
      where: { id: +id },
    });

    return attendanceDeleted;
  }
}
