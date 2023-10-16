import * as Sequelize from '@sequelize/core';
import { DataTypes, Model } from '@sequelize/core';
import type { address, addressId } from './address';
import type { attendance_unity, attendance_unityId } from './attendance_unity';
import type { family_benefits, family_benefitsId } from './family_benefits';
import type { user_identify, user_identifyId } from './user_identify';
import type { vulnerability, vulnerabilityId } from './vulnerability';

export interface familyAttributes {
  id: number;
  family_representative_fk: number;
  address_fk: number;
  attendance_unity_fk: number;
  vulnerability_fk: number;
}

export type familyPk = "id";
export type familyId = family[familyPk];
export type familyOptionalAttributes = "id";
export type familyCreationAttributes = Sequelize.InferCreationAttributes<family>;

export class family extends Model<familyAttributes, familyCreationAttributes> implements familyAttributes {
  id!: number;
  family_representative_fk!: number;
  address_fk!: number;
  attendance_unity_fk!: number;
  vulnerability_fk!: number;

  // family belongsTo address via address_fk
  address_fk_address!: address;
  getAddress_fk_address!: Sequelize.BelongsToGetAssociationMixin<address>;
  setAddress_fk_address!: Sequelize.BelongsToSetAssociationMixin<address, addressId>;
  createAddress_fk_address!: Sequelize.BelongsToCreateAssociationMixin<address>;
  // family belongsTo attendance_unity via attendance_unity_fk
  attendance_unity_fk_attendance_unity!: attendance_unity;
  getAttendance_unity_fk_attendance_unity!: Sequelize.BelongsToGetAssociationMixin<attendance_unity>;
  setAttendance_unity_fk_attendance_unity!: Sequelize.BelongsToSetAssociationMixin<attendance_unity, attendance_unityId>;
  createAttendance_unity_fk_attendance_unity!: Sequelize.BelongsToCreateAssociationMixin<attendance_unity>;
  // family hasMany family_benefits via family_fk
  family_benefits!: family_benefits[];
  getFamily_benefits!: Sequelize.HasManyGetAssociationsMixin<family_benefits>;
  setFamily_benefits!: Sequelize.HasManySetAssociationsMixin<family_benefits, family_benefitsId>;
  addFamily_benefit!: Sequelize.HasManyAddAssociationMixin<family_benefits, family_benefitsId>;
  addFamily_benefits!: Sequelize.HasManyAddAssociationsMixin<family_benefits, family_benefitsId>;
  createFamily_benefit!: Sequelize.HasManyCreateAssociationMixin<family_benefits>;
  removeFamily_benefit!: Sequelize.HasManyRemoveAssociationMixin<family_benefits, family_benefitsId>;
  removeFamily_benefits!: Sequelize.HasManyRemoveAssociationsMixin<family_benefits, family_benefitsId>;
  hasFamily_benefit!: Sequelize.HasManyHasAssociationMixin<family_benefits, family_benefitsId>;
  hasFamily_benefits!: Sequelize.HasManyHasAssociationsMixin<family_benefits, family_benefitsId>;
  countFamily_benefits!: Sequelize.HasManyCountAssociationsMixin<family_benefits>;
  // family hasMany user_identify via family_fk
  user_identifies!: user_identify[];
  getUser_identifies!: Sequelize.HasManyGetAssociationsMixin<user_identify>;
  setUser_identifies!: Sequelize.HasManySetAssociationsMixin<user_identify, user_identifyId>;
  addUser_identify!: Sequelize.HasManyAddAssociationMixin<user_identify, user_identifyId>;
  addUser_identifies!: Sequelize.HasManyAddAssociationsMixin<user_identify, user_identifyId>;
  createUser_identify!: Sequelize.HasManyCreateAssociationMixin<user_identify>;
  removeUser_identify!: Sequelize.HasManyRemoveAssociationMixin<user_identify, user_identifyId>;
  removeUser_identifies!: Sequelize.HasManyRemoveAssociationsMixin<user_identify, user_identifyId>;
  hasUser_identify!: Sequelize.HasManyHasAssociationMixin<user_identify, user_identifyId>;
  hasUser_identifies!: Sequelize.HasManyHasAssociationsMixin<user_identify, user_identifyId>;
  countUser_identifies!: Sequelize.HasManyCountAssociationsMixin<user_identify>;
  // family belongsTo vulnerability via vulnerability_fk
  vulnerability_fk_vulnerability!: vulnerability;
  getVulnerability_fk_vulnerability!: Sequelize.BelongsToGetAssociationMixin<vulnerability>;
  setVulnerability_fk_vulnerability!: Sequelize.BelongsToSetAssociationMixin<vulnerability, vulnerabilityId>;
  createVulnerability_fk_vulnerability!: Sequelize.BelongsToCreateAssociationMixin<vulnerability>;

  static initModel(sequelize: Sequelize.Sequelize): typeof family {
    return family.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    family_representative_fk: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    address_fk: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        table: 'address',
        key: 'id'
      }
    },
    attendance_unity_fk: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        table: 'attendance_unity',
        key: 'id'
      }
    },
    vulnerability_fk: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        table: 'vulnerability',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'family',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "family_address_fk_fkey",
        using: "BTREE",
        fields: [
          { name: "address_fk" },
        ]
      },
      {
        name: "family_attendance_unity_fk_fkey",
        using: "BTREE",
        fields: [
          { name: "attendance_unity_fk" },
        ]
      },
      {
        name: "family_vulnerability_fk_fkey",
        using: "BTREE",
        fields: [
          { name: "vulnerability_fk" },
        ]
      },
    ]
  });
  }
}
