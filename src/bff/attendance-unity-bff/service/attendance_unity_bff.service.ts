import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { PrismaService } from 'src/prisma/prisma.service';
import { Kinship } from '@prisma/client';
import { CreateAttendanceUnityAndAddressDto } from '../dto/create-attendance_unity_bff.dto';
import { UpdateAttendanceUnityAndAddressDto } from '../dto/update-attendance_unity_bff.dto';
import { JwtPayload } from 'src/utils/jwt.interface';

@Injectable()
export class AttendanceUnityBffService {
  constructor(
    private readonly prismaService: PrismaService,
  ) {}

  async createUnityAttendanceAndAddress(
    request: Request,
    createAttendanceAndAddress: CreateAttendanceUnityAndAddressDto,
  ) {
    let edcenso_city_fk: number | undefined;
    let edcenso_uf_fk: number | undefined;

    if (createAttendanceAndAddress.edcenso_city_fk) {
      const edcenso_city = await this.prismaService.edcenso_city.findUnique({
        where: { id: createAttendanceAndAddress.edcenso_city_fk },
        include: { edcenso_uf: true },
      });

      if (!edcenso_city) {
        throw new HttpException('Cidade não encontrada', HttpStatus.NOT_FOUND);
      }

      edcenso_city_fk = edcenso_city.id;
      edcenso_uf_fk = edcenso_city.edcenso_uf_fk;
    }

    const transactionResult = await this.prismaService.$transaction(
      async (tx) => {
        const addressCreated = await tx.address.create({
          data: {
            address: createAttendanceAndAddress.address ?? null,
            telephone: createAttendanceAndAddress.telephone ?? null,
            reference: createAttendanceAndAddress.reference ?? null,
            conditions: createAttendanceAndAddress.conditions ?? null,
            construction_type: createAttendanceAndAddress.construction_type ?? null,
            rooms: createAttendanceAndAddress.rooms ?? null,
            rent_value: createAttendanceAndAddress.rent_value ?? null,
            edcenso_city_fk: edcenso_city_fk ?? null,
            edcenso_uf_fk: edcenso_uf_fk ?? null,
          } as any,
        });

        const attendanceUnity = {
          name: createAttendanceAndAddress.name,
          unity_number: createAttendanceAndAddress.unity_number,
          type: createAttendanceAndAddress.type,
          email: createAttendanceAndAddress.email,
        };

        const attendanceUnityCreated = await tx.attendance_unity.create({
          data: {
            ...attendanceUnity,
            address: { connect: { id: addressCreated.id } },
          },
        });

        return {
          attendanceUnityCreated,
          addressCreated,
        };
      },
    );

    return transactionResult;
  }

  async updateUnityAttendanceAndAddress(
    id: string,
    dto: UpdateAttendanceUnityAndAddressDto,
  ) {
    const unity = await this.prismaService.attendance_unity.findUnique({
      where: { id: parseInt(id) },
      select: { id: true, address_fk: true },
    });

    if (!unity) {
      throw new HttpException(
        'Unidade de atendimento não encontrada',
        HttpStatus.NOT_FOUND,
      );
    }

    let edcenso_city_fk: number | null = null;
    let edcenso_uf_fk: number | null = null;

    if (dto.edcenso_city_fk) {
      const city = await this.prismaService.edcenso_city.findUnique({
        where: { id: dto.edcenso_city_fk },
      });

      if (!city) {
        throw new HttpException('Cidade não encontrada', HttpStatus.NOT_FOUND);
      }

      edcenso_city_fk = city.id;
      edcenso_uf_fk = city.edcenso_uf_fk;
    }

    return this.prismaService.$transaction(async (tx) => {
      await tx.address.update({
        where: { id: unity.address_fk },
        data: {
          address: dto.address ?? undefined,
          telephone: dto.telephone ?? undefined,
          reference: dto.reference ?? undefined,
          conditions: dto.conditions ?? undefined,
          construction_type: dto.construction_type ?? undefined,
          rooms: dto.rooms ?? undefined,
          rent_value: dto.rent_value ?? undefined,
          edcenso_city_fk: edcenso_city_fk ?? undefined,
          edcenso_uf_fk: edcenso_uf_fk ?? undefined,
        } as any,
      });

      return tx.attendance_unity.update({
        where: { id: unity.id },
        data: {
          name: dto.name ?? undefined,
          unity_number: dto.unity_number ?? undefined,
          type: dto.type ?? undefined,
          email: dto.email ?? undefined,
        },
        include: {
          address: {
            include: {
              edcenso_city: { include: { edcenso_uf: true } },
            },
          },
        },
      });
    });
  }

  async getAttendanceUnityById(id: string) {
    const attendanceUnity = await this.prismaService.attendance_unity.findUnique({
      where: { id: parseInt(id) },
      include: {
        address: {
          include: {
            edcenso_city: {
              include: { edcenso_uf: true },
            },
          },
        },
      },
    });

    if (!attendanceUnity) {
      throw new HttpException(
        'Unidade de atendimento não encontrada',
        HttpStatus.NOT_FOUND,
      );
    }

    return attendanceUnity;
  }

  async getAttendanceUnity(user: JwtPayload, attendance_unity_fk?: string) {
    let attendance_unity: string = attendance_unity_fk
      ? attendance_unity_fk
      : (user.attendance_unity_ids[0]?.toString() ?? '');

    const attendanceUnity =
      await this.prismaService.attendance_unity.findUnique({
        where: { id: parseInt(attendance_unity) },
        include: {
          address: {
            include: {
              edcenso_city: {
                include: {
                  edcenso_uf: true,
                },
              },
            },
          },
        },
      });

    if (!attendanceUnity) {
      throw new HttpException(
        'Unidade de atendimento não encontrada',
        HttpStatus.NOT_FOUND,
      );
    }

    return attendanceUnity;
  }
}
