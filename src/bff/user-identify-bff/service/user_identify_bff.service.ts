import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AttendanceUnityService } from '../../../direct/attendance-unity/service/attendance_unity.service';
import { Request } from 'express';
import { PrismaService } from 'src/prisma/prisma.service';
import { Kinship, edcenso_city } from '@prisma/client';
import { optionalKeyValidation } from 'src/utils/optionalKeysValidation';
import { EdcensoBffService } from 'src/bff/edcenso-bff/service/edcenso_bff.service';
import {
  CreateUserIdentifyWithFamilyDto,
  CreateUserIdentifyWithoutFamilyDto,
} from '../dto/create-user_identify_bff.dto';
import { JwtPayload } from 'src/utils/jwt.interface';

@Injectable()
export class UserIdentifyBffService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly attendanceUnityService: AttendanceUnityService,
    private readonly edcensoService: EdcensoBffService,
  ) {}

  async createUserWithoutFamily(
    request: Request,
    createUserWithoutFamily: CreateUserIdentifyWithoutFamilyDto,
  ): Promise<any> {
    await this.attendanceUnityService.findOne(
      request,
      createUserWithoutFamily.attendance_unity.toString(),
    );

    const edcenso_city = await this.edcensoService.getEdcensoCity(request);

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
          isActive: true,
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
    const edcenso_city = await this.edcensoService.getEdcensoCity(request);

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

        return {
          userIdentifyCreated,
        };
      },
    );

    return transactionResult;
  }

  async getUsersIdentify(user: JwtPayload, attendance_unity_fk: string) {
    let attendance_unity: string = attendance_unity_fk
      ? attendance_unity_fk
      : user.attendance_unity_fk.toString();

    const usersIdentify = await this.prismaService.$queryRaw`
    SELECT ui.id, ui.name, ui.cpf, ui.birthday FROM family f 
    JOIN attendance_unity au ON au.id = f.attendance_unity_fk
    JOIN user_identify ui ON ui.family_fk = f.id
    WHERE au.id = ${attendance_unity}
    `;

    return usersIdentify;
  }
}
