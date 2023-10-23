import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {
  CreateAttendanceUnityAndAddressDto,
  CreateUserIdentifyWithFamilyDto,
  CreateUserIdentifyWithoutFamilyDto,
} from '../dto/create-bff.dto';
import { address as Address } from '../../sequelize/models/address';
import { user_identify as UserIdentify } from '../../sequelize/models/user_identify';
import { family as Family } from '../../sequelize/models/family';
import { family_benefits as FamilyBenefits, family_benefits } from '../../sequelize/models/family_benefits';
import { vulnerability as Vulnerability } from '../../sequelize/models/vulnerability';
import { edcenso_uf as EdcensoUf } from '../../sequelize/models/edcenso_uf';
import { edcenso_city as EdcensoCity } from '../../sequelize/models/edcenso_city';
import { attendance_unity as AttendanceUnity } from '../../sequelize/models/attendance_unity';
import { attendance as Attendance } from '../../sequelize/models/attendance';
import Sequelize from '@sequelize/core';
import DbConnection from '../../sequelize/sequelize';
import { AttendanceUnityService } from '../../attendance-unity/service/attendance_unity.service';

@Injectable()
export class BffService {

  attendanceUnity: AttendanceUnityService;

  constructor(
    private readonly attendanceUnityService: AttendanceUnityService
  ) {
    this.attendanceUnity = attendanceUnityService;
  }

  async createUserWithoutFamily(
    request: Request,
    createUserWithoutFamily: CreateUserIdentifyWithoutFamilyDto,
  ): Promise<any> {
    const dbName = request['dbName'];

    const connection: Sequelize = DbConnection.getInstance().getConnection();

    await this.attendanceUnity.findOne(request, createUserWithoutFamily.attendance_unity_fk.toString());

    await this.getEdcensoUf(request, createUserWithoutFamily.edcenso_uf_fk.toString());

    await this.getEdcensoCity(request, createUserWithoutFamily.edcenso_city_fk.toString());

    const transactionResult = await connection.transaction(async (t) => {
      const address = {
        edcenso_uf_fk: createUserWithoutFamily.edcenso_uf_fk,
        edcenso_city_fk: createUserWithoutFamily.edcenso_city_fk,
        address: createUserWithoutFamily.address,
        telephone: createUserWithoutFamily.telephone,
        reference: createUserWithoutFamily.reference,
        conditions: createUserWithoutFamily.conditions,
        construction_type: createUserWithoutFamily.construction_type,
        rooms: createUserWithoutFamily.rooms,
        rent_value: createUserWithoutFamily.rent_value,
      };

      const addressCreated = await Address.create(address, { transaction: t });

      const vulnerability = {
        irregular_ocupation: createUserWithoutFamily.irregular_ocupation,
        alone_child: createUserWithoutFamily.alone_child,
        dependent_elderly: createUserWithoutFamily.dependent_elderly,
        unemployed: createUserWithoutFamily.unemployed,
        deficient: createUserWithoutFamily.deficient,
        low_income: createUserWithoutFamily.low_income,
        others: createUserWithoutFamily.others,
      };

      const vulnerabilityCreated = await Vulnerability.create(vulnerability, {
        transaction: t,
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
        signed_portfolio: createUserWithoutFamily.signed_portfolio,
        nuclear_family: createUserWithoutFamily.nuclear_family,
      };

      const userIdentifyCreated = await UserIdentify.create(userIdentify, {
        transaction: t,
      });

      const family = {
        vulnerability_fk: vulnerabilityCreated.id,
        family_representative_fk: userIdentifyCreated.id,
        address_fk: addressCreated.id,
        attendance_unity_fk: createUserWithoutFamily.attendance_unity_fk,
      };

      const familyCreated = await Family.create(family, { transaction: t });

      await FamilyBenefits.bulkCreate(
        createUserWithoutFamily.benefitsForFamily.map((benefit) => ({
          family_fk: familyCreated.id,
          benefits_fk: benefit.benefits_fk,
          value: benefit.value,
        })),
        { transaction: t },
      );

      await UserIdentify.update(
        { family_fk: familyCreated.id },
        { where: { id: userIdentifyCreated.id }, transaction: t },
      );

      return {
        userIdentifyCreated,
        familyCreated,
        addressCreated,
        vulnerability,
      };
    });

    return transactionResult;
  }

  async createUserWithFamily(
    request: Request,
    createUserWithFamily: CreateUserIdentifyWithFamilyDto,
  ): Promise<any> {
    const dbName = request['dbName'];

    const connection: Sequelize = DbConnection.getInstance().getConnection();

    const transactionResult = await connection.transaction(async (t) => {
      const userIdentify = {
        family_fk: createUserWithFamily.family_fk,
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
        signed_portfolio: createUserWithFamily.signed_portfolio,
        nuclear_family: createUserWithFamily.nuclear_family,
      };

      const userIdentifyCreated = await UserIdentify.create(userIdentify, {
        transaction: t,
      });

      await FamilyBenefits.bulkCreate(
        createUserWithFamily.benefitsForFamily.map((benefit) => ({
          family_fk: createUserWithFamily.family_fk,
          benefits_fk: benefit.benefits_fk,
          value: benefit.value,
        })),
        { transaction: t },
      );

      return {
        userIdentifyCreated,
      };
    });

    return transactionResult;
  }

  async createUnityAttendanceAndAddress(
    request: Request,
    createAttendanceAndAddress: CreateAttendanceUnityAndAddressDto,
  ) {
    const dbName = request['dbName'];

    const connection: Sequelize = DbConnection.getInstance().getConnection();

    const transactionResult = await connection.transaction(async (t) => {
      const address = {
        edcenso_uf_fk: createAttendanceAndAddress.edcenso_uf_fk,
        edcenso_city_fk: createAttendanceAndAddress.edcenso_city_fk,
        address: createAttendanceAndAddress.address,
        telephone: createAttendanceAndAddress.telephone,
        reference: createAttendanceAndAddress.reference,
        conditions: createAttendanceAndAddress.conditions,
        construction_type: createAttendanceAndAddress.construction_type,
        rooms: createAttendanceAndAddress.rooms,
        rent_value: createAttendanceAndAddress.rent_value,
      };

      const addressCreated = await Address.create(address, { transaction: t });

      const attendanceUnity = {
        name: createAttendanceAndAddress.name,
        address_fk: addressCreated.id,
      };

      const attendanceUnityCreated = await AttendanceUnity.create(
        attendanceUnity,
        { transaction: t },
      );

      return {
        attendanceUnityCreated,
        addressCreated,
      };
    });

    return transactionResult;
  }

  async getState(request: Request): Promise<any> {
    const dbName = request['dbName'];

    const states = await EdcensoUf.withSchema(dbName).findAll({
      attributes: ['id', 'name', 'acronym'],
      order: [['name', 'ASC']],
    });

    return states;
  }

  async getCity(request: Request, ufId: string): Promise<any> {
    const dbName = request['dbName'];

    const cities = await EdcensoCity.withSchema(dbName).findAll({
      attributes: ['id', 'name', 'edcenso_uf_fk'],
      where: { edcenso_uf_fk: +ufId },
      order: [['name', 'ASC']],
    });

    return cities;
  }

  async getAttendance(request: Request): Promise<any> {
    const dbName = request['dbName'];

    const attendance = await Attendance.withSchema(dbName).findAll({
      attributes: ['id', 'result'],
      include: ['task', 'technician'],
      order: [['id', 'ASC']],
    });

    return attendance;
  }

  async getAllFromFamily(request: Request, familyId: string): Promise<any> {
    const dbName = request['dbName'];

    const family = await Family.withSchema(dbName).findByPk(+familyId, {
      include: [
        'address',
        'attendance_unity',
        'vulnerability',
        'user_identifies',
        {model: family_benefits, include: ['benefits']}
      ],
    });

    if(!family){
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

  private async getEdcensoUf(request: Request, ufId: string): Promise<any> {
    const dbName = request['dbName'];

    const edcensoUf = await EdcensoUf.withSchema(dbName).findByPk(+ufId);

    if(!edcensoUf){
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Estado não encontrado',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    return edcensoUf;
  }

  private async getEdcensoCity(request: Request, cityId: string): Promise<any> {
    const dbName = request['dbName'];

    const edcensoCity = await EdcensoCity.withSchema(dbName).findByPk(+cityId);

    if(!edcensoCity){
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
