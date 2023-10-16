import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserIdentifyWithFamilyDto, CreateUserIdentifyWithoutFamilyDto } from '../dto/create-bff.dto';
import { address as Address } from '../../sequelize/models/address';
import { user_identify as UserIdentify } from '../../sequelize/models/user_identify';
import { family as Family } from '../../sequelize/models/family';
import { family_benefits as FamilyBenefits } from '../../sequelize/models/family_benefits';
import { vulnerability as Vulnerability } from '../../sequelize/models/vulnerability';
import { edcenso_uf as EdcensoUf } from '../../sequelize/models/edcenso_uf';
import { edcenso_city as EdcensoCity } from '../../sequelize/models/edcenso_city';
import Sequelize from '@sequelize/core';
import DbConnection from '../../sequelize/sequelize';

@Injectable()
export class BffService {
  async createUserWithoutFamily(
    request: Request,
    createUserWithoutFamily: CreateUserIdentifyWithoutFamilyDto,
  ): Promise<any> {
    const dbName = request['dbName'];

    const connection: Sequelize = DbConnection.getInstance().getConnection();

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
        mother: createUserWithoutFamily.mother,
        father: createUserWithoutFamily.father,
        marital_status: createUserWithoutFamily.marital_status,
        escolarity: createUserWithoutFamily.escolarity,
        initial_date: createUserWithoutFamily.initial_date,
        final_date: createUserWithoutFamily.final_date,
        profission: createUserWithoutFamily.profission,
        income: createUserWithoutFamily.income,
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
        mother: createUserWithFamily.mother,
        father: createUserWithFamily.father,
        marital_status: createUserWithFamily.marital_status,
        escolarity: createUserWithFamily.escolarity,
        initial_date: createUserWithFamily.initial_date,
        final_date: createUserWithFamily.final_date,
        profission: createUserWithFamily.profission,
        income: createUserWithFamily.income,
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
}
