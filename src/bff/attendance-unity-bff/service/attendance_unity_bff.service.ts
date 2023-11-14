import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { PrismaService } from 'src/prisma/prisma.service';
import { Kinship, edcenso_city } from '@prisma/client';
import { optionalKeyValidation } from 'src/utils/optionalKeysValidation';
import { CreateAttendanceUnityAndAddressDto } from '../dto/create-attendance_unity_bff.dto';
import { EdcensoBffService } from 'src/bff/edcenso-bff/service/edcenso_bff.service';
import { JwtPayload } from 'src/utils/jwt.interface';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AttendanceUnityBffService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly edcensoService: EdcensoBffService,
  ) {}

  async createUnityAttendanceAndAddress(
    request: Request,
    createAttendanceAndAddress: CreateAttendanceUnityAndAddressDto,
  ) {
    const edcenso_city = await this.edcensoService.getEdcensoCity(request);
    const edcenso_uf = edcenso_city.edcenso_uf_fk;

    const transactionResult = await this.prismaService.$transaction(
      async (tx) => {
        const address = {
          address: createAttendanceAndAddress.address,
          telephone: createAttendanceAndAddress.telephone,
          reference: createAttendanceAndAddress.reference,
          conditions: createAttendanceAndAddress.conditions,
          construction_type: createAttendanceAndAddress.construction_type,
          rooms: createAttendanceAndAddress.rooms,
          rent_value: createAttendanceAndAddress.rent_value,
        };

        const addressCreated = await tx.address.create({
          data: {
            ...address,
            edcenso_city: { connect: { id: edcenso_city.id } },
            edcenso_uf: { connect: { id: edcenso_uf } },
          },
        });

        const attendanceUnity = {
          name: createAttendanceAndAddress.name,
        };

        const attendanceUnityCreated = await tx.attendance_unity.create({
          data: {
            ...attendanceUnity,
            edcenso_city: { connect: { id: edcenso_city.id } },
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

  async getAttendanceUnityById(user: JwtPayload) {
    const attendanceUnity =
      await this.prismaService.attendance_unity.findUnique({
        where: { id: user.attendance_unity_fk },
        include: {
          address: true,
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

  async setAttendanceToUser(req: Request, attendanceUnityId: number) {
    const token = req.headers.authorization?.split(' ')[1];

    if (token) {
      try {
        const decodedToken = jwt.verify(
          token,
          process.env.SECRET,
        ) as JwtPayload;

        req.user = decodedToken;
      } catch (error) {
        throw new HttpException(error, 401);
      }
    }
  }
}
