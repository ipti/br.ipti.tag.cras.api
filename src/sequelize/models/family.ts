import * as Sequelize from '@sequelize/core';
import { DataTypes, Model } from '@sequelize/core';
import type { address, addressId } from './address';
import type { attendance_unity, attendance_unityId } from './attendance_unity';
import type { benefits, benefitsId } from './benefits';
import type { user_identify, user_identifyId } from './user_identify';

export interface familyAttributes {
  id: number;
  family_representative_fk: number;
  address_fk: number;
  benefit_fk: number;
  attendance_unity_fk: number;
}

export type familyPk = "id";
export type familyId = family[familyPk];
export type familyOptionalAttributes = "id";
export type familyCreationAttributes = Sequelize.InferCreationAttributes<family>;

export class family extends Model<familyAttributes, familyCreationAttributes> implements familyAttributes {
  id!: number;
  family_representative_fk!: number;
  address_fk!: number;
  benefit_fk!: number;
  attendance_unity_fk!: number;

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
  // family belongsTo benefits via benefit_fk
  benefit_fk_benefit!: benefits;
  getBenefit_fk_benefit!: Sequelize.BelongsToGetAssociationMixin<benefits>;
  setBenefit_fk_benefit!: Sequelize.BelongsToSetAssociationMixin<benefits, benefitsId>;
  createBenefit_fk_benefit!: Sequelize.BelongsToCreateAssociationMixin<benefits>;
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
    benefit_fk: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        table: 'benefits',
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
        name: "family_benefit_fk_fkey",
        using: "BTREE",
        fields: [
          { name: "benefit_fk" },
        ]
      },
      {
        name: "family_attendance_unity_fk_fkey",
        using: "BTREE",
        fields: [
          { name: "attendance_unity_fk" },
        ]
      },
    ]
  });
  }
}
