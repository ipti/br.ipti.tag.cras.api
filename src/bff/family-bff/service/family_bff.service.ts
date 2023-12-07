import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AttendanceUnityService } from '../../../direct/attendance-unity/service/attendance_unity.service';
import { Request } from 'express';
import { PrismaService } from 'src/prisma/prisma.service';
import { Role } from '@prisma/client';

@Injectable()
export class FamilyBffService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAllFromFamily(request: Request, familyId: string): Promise<any> {
    const family = await this.prismaService.family.findUnique({
      where: {
        id: +familyId,
        edcenso_city_fk: request.user.edcenso_city_fk,
      },
      include: {
        address: true,
        attendance_unity: true,
        vulnerability: true,
        user_identify: true,
        condicionalities: true,
        benefits: {
          include: {
            benefits: true,
          },
        },
      },
    });

    if (!family) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Família não encontrada',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    return family;
  }

  async getAllFamilyWithRepresentative(
    request: Request,
    attendance_unity_fk: string,
  ): Promise<any> {
    var family;

    if (attendance_unity_fk !== undefined) {
      family = await this.prismaService.family.findMany({
        where: {
          attendance_unity_fk: +attendance_unity_fk,
        },
        include: {
          user_identify: {
            select: {
              id: true,
              kinship: true,
              name: true,
              birthday: true,
              initial_date: true,
            },
          },
        },
        orderBy: {
          id: 'desc',
        },
      });
    } else if (request.user.attendance_unity_fk !== null) {
      family = await this.prismaService.family.findMany({
        where: {
          attendance_unity_fk: request.user.attendance_unity_fk,
        },
        include: {
          user_identify: {
            select: {
              id: true,
              kinship: true,
              name: true,
              birthday: true,
              initial_date: true,
            },
          },
        },
        orderBy: {
          id: 'desc',
        },
      });
    } else {
      family = await this.prismaService.family.findMany({
        where: {
          edcenso_city_fk: request.user.edcenso_city_fk,
        },
        include: {
          user_identify: {
            select: {
              id: true,
              kinship: true,
              name: true,
              birthday: true,
              initial_date: true,
            },
          },
        },
        orderBy: {
          id: 'desc',
        },
      });
    }

    Promise.all(
      family.map((family) => {
        family['representative'] = family.user_identify.find(
          (user) => user.id === family.family_representative_fk,
        );
        family['members_quantity'] = family.user_identify.length;
        delete family.user_identify;
        return family;
      }),
    );

    return family;
  }

  async deleteFamily(request: Request, familyId: string): Promise<any> {
    try {
      if (request.user.role !== Role.SECRETARY) {
        throw new HttpException(
          {
            status: HttpStatus.UNAUTHORIZED,
            error: 'Você não tem permissão para deletar uma família',
          },
          HttpStatus.UNAUTHORIZED,
        );
      }

      const family = await this.prismaService.family.findUnique({
        where: {
          id: +familyId,
          edcenso_city_fk: request.user.edcenso_city_fk,
        },
      });

      if (!family) {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            error: 'Família não encontrada',
          },
          HttpStatus.NOT_FOUND,
        );
      }

      await this.prismaService.family.delete({
        where: {
          id: +familyId,
        },
      });

      return family;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: error,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
