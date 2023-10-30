import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {
  CreateAttendanceUnityAndAddressDto,
  CreateUserIdentifyWithFamilyDto,
  CreateUserIdentifyWithoutFamilyDto,
} from '../dto/create-bff.dto';
import Sequelize from '@sequelize/core';
import { AttendanceUnityService } from '../../attendance-unity/service/attendance_unity.service';
import { Request } from 'express';
import { PrismaService } from 'src/prisma/prisma.service';
import { Kinship, edcenso_city } from '@prisma/client';
import { optionalKeyValidation } from 'src/utils/optionalKeysValidation';

@Injectable()
export class BffService {
  attendanceUnity: AttendanceUnityService;

  constructor(
    private readonly prismaService: PrismaService,
    private readonly attendanceUnityService: AttendanceUnityService,
  ) {
    this.attendanceUnity = attendanceUnityService;
  }

  async createUserWithoutFamily(
    request: Request,
    createUserWithoutFamily: CreateUserIdentifyWithoutFamilyDto,
  ): Promise<any> {
    await this.attendanceUnity.findOne(
      request,
      createUserWithoutFamily.attendance_unity.toString(),
    );

    const edcenso_city = await this.getEdcensoCity(request);

    const edcenso_uf = edcenso_city.edcenso_uf_fk;

    const transactionResult = await this.prismaService.$transaction(
      async (tx) => {
        const address = {
          address: createUserWithoutFamily.address,
          telephone: createUserWithoutFamily.telephone,
          reference: createUserWithoutFamily.reference,
          conditions: createUserWithoutFamily.conditions,
          construction_type: createUserWithoutFamily.construction_type,
          rooms: createUserWithoutFamily.rooms,
          rent_value: createUserWithoutFamily.rent_value,
        };

        const addressCreated = await tx.address.create({
          data: {
            ...address,
            edcenso_city: { connect: { id: edcenso_city.id } },
            edcenso_uf: { connect: { id: edcenso_uf } },
          },
        });

        const vulnerability = {
          irregular_ocupation: createUserWithoutFamily.irregular_ocupation,
          alone_child: createUserWithoutFamily.alone_child,
          dependent_elderly: createUserWithoutFamily.dependent_elderly,
          unemployed: createUserWithoutFamily.unemployed,
          deficient: createUserWithoutFamily.deficient,
          low_income: createUserWithoutFamily.low_income,
          others: createUserWithoutFamily.others,
        };

        const vulnerabilityCreated = await tx.vulnerability.create({
          data: {
            ...vulnerability,
            edcenso_city: { connect: { id: edcenso_city.id } },
          },
        });

        const userIdentify = {
          name: createUserWithoutFamily.name,
          surname: createUserWithoutFamily.surname,
          folder: createUserWithoutFamily.folder,
          archive: createUserWithoutFamily.archive,
          number: createUserWithoutFamily.number,
          birthday: createUserWithoutFamily.birthday,
          birth_certificate: createUserWithoutFamily.birth_certificate,
          nis: createUserWithoutFamily.nis,
          rg_number: createUserWithoutFamily.rg_number,
          rg_date_emission: createUserWithoutFamily.rg_date_emission,
          uf_rg: createUserWithoutFamily.uf_rg,
          emission_rg: createUserWithoutFamily.emission_rg,
          cpf: createUserWithoutFamily.cpf,
          is_deficiency: createUserWithoutFamily.is_deficiency,
          deficiency: createUserWithoutFamily.deficiency,
          filiation_1: createUserWithoutFamily.filiation_1,
          filiation_2: createUserWithoutFamily.filiation_2,
          marital_status: createUserWithoutFamily.marital_status,
          escolarity: createUserWithoutFamily.escolarity,
          initial_date: createUserWithoutFamily.initial_date,
          final_date: createUserWithoutFamily.final_date,
          profission: createUserWithoutFamily.profission,
          income: createUserWithoutFamily.income,
          kinship: Kinship.RESPONSAVEL,
          signed_portfolio: createUserWithoutFamily.signed_portfolio,
          nuclear_family: createUserWithoutFamily.nuclear_family,
        };

        const userIdentifyCreated = await tx.user_identify.create({
          data: {
            ...userIdentify,
            edcenso_city: { connect: { id: edcenso_city.id } },
          },
        });

        const family = {
          vulnerability: vulnerabilityCreated.id,
          family_representative_fk: userIdentifyCreated.id,
          address: addressCreated.id,
          attendance_unity: createUserWithoutFamily.attendance_unity,
        };

        const familyCreated = await tx.family.create({
          data: {
            ...family,
            edcenso_city: { connect: { id: edcenso_city.id } },
            address: { connect: { id: addressCreated.id } },
            attendance_unity: {
              connect: { id: createUserWithoutFamily.attendance_unity },
            },
            vulnerability: { connect: { id: vulnerabilityCreated.id } },
          },
        });

        createUserWithoutFamily.benefitsForFamily.forEach(async (benefit) => {
          await tx.family_benefits.create({
            data: {
              family: { connect: { id: familyCreated.id } },
              benefits: { connect: { id: benefit.benefits_fk } },
              edcenso_city: { connect: { id: edcenso_city.id } },
              value: benefit.value,
            },
          });
        });

        const familyOptional = optionalKeyValidation(familyCreated.id, {
          connect: {
            id: familyCreated.id,
          },
        });

        const cityOptional = optionalKeyValidation(
          request.user.edcenso_city_fk,
          {
            connect: {
              id: request.user.edcenso_city_fk,
            },
          },
        );

        await tx.user_identify.update({
          where: {
            id: userIdentifyCreated.id,
            edcenso_city_fk: request.user.edcenso_city_fk,
          },
          data: { family: familyOptional, edcenso_city: cityOptional },
        });

        return {
          userIdentifyCreated,
          familyCreated,
          addressCreated,
          vulnerability,
        };
      },
    );

    return transactionResult;
  }

  async createUserWithFamily(
    request: Request,
    createUserWithFamily: CreateUserIdentifyWithFamilyDto,
  ): Promise<any> {
    const edcenso_city = await this.getEdcensoCity(request);

    const edcenso_uf = edcenso_city.edcenso_uf_fk;

    const transactionResult = await this.prismaService.$transaction(
      async (tx) => {
        const userIdentify = {
          family: createUserWithFamily.family,
          name: createUserWithFamily.name,
          surname: createUserWithFamily.surname,
          folder: createUserWithFamily.folder,
          archive: createUserWithFamily.archive,
          number: createUserWithFamily.number,
          birthday: createUserWithFamily.birthday,
          birth_certificate: createUserWithFamily.birth_certificate,
          nis: createUserWithFamily.nis,
          rg_number: createUserWithFamily.rg_number,
          rg_date_emission: createUserWithFamily.rg_date_emission,
          uf_rg: createUserWithFamily.uf_rg,
          emission_rg: createUserWithFamily.emission_rg,
          cpf: createUserWithFamily.cpf,
          is_deficiency: createUserWithFamily.is_deficiency,
          deficiency: createUserWithFamily.deficiency,
          filiation_1: createUserWithFamily.filiation_1,
          filiation_2: createUserWithFamily.filiation_2,
          marital_status: createUserWithFamily.marital_status,
          escolarity: createUserWithFamily.escolarity,
          initial_date: createUserWithFamily.initial_date,
          final_date: createUserWithFamily.final_date,
          profission: createUserWithFamily.profission,
          income: createUserWithFamily.income,
          kinship: createUserWithFamily.kinship,
          signed_portfolio: createUserWithFamily.signed_portfolio,
          nuclear_family: createUserWithFamily.nuclear_family,
        };

        const userIdentifyCreated = await tx.user_identify.create({
          data: {
            ...userIdentify,
            edcenso_city: { connect: { id: edcenso_city.id } },
            family: { connect: { id: userIdentify.family } },
          },
        });

        createUserWithFamily.benefitsForFamily.forEach(async (benefit) => {
          await tx.family_benefits.create({
            data: {
              family: { connect: { id: createUserWithFamily.family } },
              benefits: { connect: { id: benefit.benefits_fk } },
              edcenso_city: { connect: { id: edcenso_city.id } },
              value: benefit.value,
            },
          });
        });

        return {
          userIdentifyCreated,
        };
      },
    );

    return transactionResult;
  }

  async createUnityAttendanceAndAddress(
    request: Request,
    createAttendanceAndAddress: CreateAttendanceUnityAndAddressDto,
  ) {
    const edcenso_city = await this.getEdcensoCity(request);
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

  async getAttendance(request: Request): Promise<any> {
    // const attendance = await Attendance.withSchema(dbName).findAll({
    //   attributes: ['id', 'result'],
    //   include: ['task', 'technician'],
    //   order: [['id', 'ASC']],
    // });

    const attendance = await this.prismaService.attendance.findMany({
      where: {
        edcenso_city_fk: request.user.edcenso_city_fk,
      },
      include: {
        task: true,
        technician: true,
      },
      orderBy: {
        id: 'asc',
      },
    });

    return attendance;
  }

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
        benefits: {
          include: {
            benefits: true,
          }
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

  private async getEdcensoCity(request: Request): Promise<edcenso_city> {
    const edcensoCity = await this.prismaService.edcenso_city.findUnique({
      where: {
        id: request.user.edcenso_city_fk,
      },
    });

    if (!edcensoCity) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Cidade não encontrada',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    return edcensoCity;
  }
}
