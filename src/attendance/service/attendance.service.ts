import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { attendance as Attendance } from '../../sequelize/models/attendance';
import { CreateAttendanceDto } from '../dto/create-attendance.dto';
import { UpdateAttendanceDto } from '../dto/update-attendance.dto';
import { UserIdentifyService } from '../../user-identify/service/user_identify.service';
import { TechnicianService } from '../../technician/service/technician.service';

@Injectable()
export class AttendanceService {

  user_identify: UserIdentifyService;
  technician: TechnicianService;

  constructor(
    userIdentifyService: UserIdentifyService,
    technicianService: TechnicianService,
  ){
    this.user_identify = userIdentifyService;
    this.technician = technicianService;
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
