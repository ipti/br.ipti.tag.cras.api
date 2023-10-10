import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { attendance_unity as AttendanceUnity } from '../../sequelize/models/attendance_unity';
import { CreateAttendanceUnityDto } from '../dto/create-attendance_unity.dto';
import { UpdateAttendanceUnityDto } from '../dto/update-attendance_unity.dto';
import { UserService } from '../../user/service/user.service';

@Injectable()
export class AttendanceUnityService {

  user: UserService;

  constructor(userService: UserService){
    this.user = userService;
  }

  async create(
    request: Request,
    createAttendanceUnity: CreateAttendanceUnityDto,
  ): Promise<AttendanceUnity> {
    const dbName = request['dbName'];

    const createdAttendanceUnity = await AttendanceUnity.withSchema(dbName).create({
      ...createAttendanceUnity,
    });

    return createdAttendanceUnity;
  }

  async findAll(request: Request): Promise<AttendanceUnity[]> {
    const dbName = request['dbName'];

    const allAttendanceUnity = await AttendanceUnity.withSchema(dbName).findAll();

    return allAttendanceUnity;
  }

  async findOne(request: Request, id: string): Promise<AttendanceUnity> {
    const dbName = request['dbName'];

    const attendance_unity = await AttendanceUnity.withSchema(dbName).findByPk(+id);

    if (!attendance_unity) {
      throw new HttpException('AttendanceUnity not found', HttpStatus.NOT_FOUND);
    }

    return attendance_unity;
  }

  async update(
    request: Request,
    id: string,
    UpdateAttendanceUnityDto: UpdateAttendanceUnityDto,
  ) {
    const dbName = request['dbName'];

    await this.findOne(request, id);

    const attendance_unityUpdated = await AttendanceUnity.withSchema(dbName).update(
      {
        ...UpdateAttendanceUnityDto,
      },
      {
        where: { id: +id },
      },
    );

    return attendance_unityUpdated;
  }

  async remove(request: Request, id: string) {
    await this.findOne(request, id);

    const dbName = request['dbName'];

    const attendance_unityDeleted = await AttendanceUnity.withSchema(dbName).destroy({
      where: { id: +id },
    });

    return attendance_unityDeleted;
  }
}
