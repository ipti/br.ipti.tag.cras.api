import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { technician as Technician } from '../../sequelize/models/technician';
import { CreateTechnicianDto } from '../dto/create-technician.dto';
import { UpdateTechnicianDto } from '../dto/update-technician.dto';
import { UserService } from '../../user/service/user.service';

@Injectable()
export class TechnicianService {

  user: UserService;

  constructor(userService: UserService){
    this.user = userService;
  }

  async create(
    request: Request,
    createTechnician: CreateTechnicianDto,
  ): Promise<Technician> {
    const dbName = request['dbName'];

    const user = await this.user.findOne(request, createTechnician.user_fk.toString());

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const createdTechnician = await Technician.withSchema(dbName).create({
      ...createTechnician,
    });

    return createdTechnician;
  }

  async findAll(request: Request): Promise<Technician[]> {
    const dbName = request['dbName'];

    const allTechnician = await Technician.withSchema(dbName).findAll();

    return allTechnician;
  }

  async findOne(request: Request, id: string): Promise<Technician> {
    const dbName = request['dbName'];

    const technician = await Technician.withSchema(dbName).findByPk(+id);

    if (!technician) {
      throw new HttpException('Technician not found', HttpStatus.NOT_FOUND);
    }

    return technician;
  }

  async update(
    request: Request,
    id: string,
    UpdateTechnicianDto: UpdateTechnicianDto,
  ) {
    const dbName = request['dbName'];

    await this.findOne(request, id);

    const technicianUpdated = await Technician.withSchema(dbName).update(
      {
        ...UpdateTechnicianDto,
      },
      {
        where: { id: +id },
      },
    );

    return technicianUpdated;
  }

  async remove(request: Request, id: string) {
    await this.findOne(request, id);

    const dbName = request['dbName'];

    const technicianDeleted = await Technician.withSchema(dbName).destroy({
      where: { id: +id },
    });

    return technicianDeleted;
  }
}
