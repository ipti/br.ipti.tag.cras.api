import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { PrismaService } from 'src/prisma/prisma.service';
import { optionalKeyValidation } from 'src/utils/optionalKeysValidation';
import { JwtPayload } from 'src/utils/jwt.interface';
import { CreateTechnicianVisitsDto } from '../dto/create-technician_visits.dto';

@Injectable()
export class TechnicianVisitsBffService {
  constructor(private readonly prismaService: PrismaService) {}

  async createTechnicianVisits(
    user: JwtPayload,
    technicianVisists: CreateTechnicianVisitsDto,
  ) {
    const technician = await this.prismaService.technician.findUnique({
      where: {
        user_fk: user.id,
      },
    });

    const technicianVisits = await this.prismaService.technician_visits.create({
      data: {
        technician: {
          connect: {
            id: technician.id,
          },
        },
        attendance_unity: {
          connect: {
            id: technician.attendance_unity_fk,
          },
        },
        family: {
          connect: {
            id: technicianVisists.family,
          },
        },
        created_at: technicianVisists.created_at,
      },
    });

    return technicianVisits;
  }

  async getTechnicianVisits(user: JwtPayload) {
    const technician = await this.prismaService.technician.findUnique({
      where: {
        user_fk: user.id,
      },
    });

    const technicianVisits =
      await this.prismaService.technician_visits.findMany({
        where: {
          technician: {
            id: technician.id,
          },
        },
      });

    return technicianVisits;
  }
}
