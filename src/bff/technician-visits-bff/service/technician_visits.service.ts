import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { PrismaService } from 'src/prisma/prisma.service';
import { optionalKeyValidation } from 'src/utils/optionalKeysValidation';
import { JwtPayload } from 'src/utils/jwt.interface';
import { CreateTechnicianVisitsDto } from '../dto/create-technician_visits.dto';
import { UpdateTechnicianVisitsDto } from '../dto/update-technician_visits.dto';

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

    const attendanceOptional = optionalKeyValidation(
      technicianVisists.attendance,
      {
        connect: {
          id: technicianVisists.attendance,
        },
      },
    );

    const technicianVisits = await this.prismaService.technician_visits.create({
      data: {
        technician: {
          connect: {
            id: technician.id,
          },
        },
        attendance_unity: {
          connect: {
            id: technicianVisists.attendance_unity,
          },
        },
        family: {
          connect: {
            id: technicianVisists.family,
          },
        },
        attendance: attendanceOptional,
        title: technicianVisists.title,
        description: technicianVisists.description,
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

  async updateTechnicianVisits(
    technicianVisitsId: string,
    technicianVisits: UpdateTechnicianVisitsDto,
  ) {
    const technicianVisitsExists =
      await this.prismaService.technician_visits.findUnique({
        where: {
          id: +technicianVisitsId,
        },
      });

    if (!technicianVisitsExists) {
      throw new HttpException(
        'Visita técnica não encontrada',
        HttpStatus.NOT_FOUND,
      );
    }

    const technicianVisitsUpdated =
      await this.prismaService.technician_visits.update({
        where: {
          id: technicianVisitsExists.id,
        },
        data: {
          title: technicianVisits.title,
          description: technicianVisits.description,
          attendance: {},
          attendance_unity: {},
          family: {},
          technician: {},
        },
      });

    return technicianVisitsUpdated;
  }
}
