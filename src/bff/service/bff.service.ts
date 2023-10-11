import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserIdentifyWithoutFamilyDto } from '../dto/create-bff.dto';
import { address as Address } from '../../sequelize/models/address';
import { user_identify as UserIdentify } from '../../sequelize/models/user_identify';
import { family as Family } from '../../sequelize/models/family';
import { family_benefits as FamilyBenefits } from '../../sequelize/models/family_benefits';
import { vulnerability as Vulnerability } from '../../sequelize/models/vulnerability';
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
        vulnerability_fk: vulnerabilityCreated.id,
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
        family_representative_fk: userIdentifyCreated.id,
        address_fk: addressCreated.id,
        attendance_unity_fk: createUserWithoutFamily.attendance_unity_fk,
      };

      const familyCreated = await Family.create(family, { transaction: t });

      const familyBenefits = {
        family_fk: familyCreated.id,
        benefits_fk: createUserWithoutFamily.benefits_fk,
        value: createUserWithoutFamily.value,
      };

      await FamilyBenefits.create(familyBenefits, { transaction: t });

      await UserIdentify.update(
        { family_fk: familyCreated.id },
        { where: { id: userIdentifyCreated.id }, transaction: t },
      );

      return {
        userIdentifyCreated,
        familyCreated,
        familyBenefits,
        addressCreated,
        vulnerability,
      };
    });

    return transactionResult;
  }
}
