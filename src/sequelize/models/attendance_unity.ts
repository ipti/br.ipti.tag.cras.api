import * as Sequelize from '@sequelize/core';
import { DataTypes, Model } from '@sequelize/core';
import type { address, addressId } from './address';
import type { attendance, attendanceId } from './attendance';
import type { family, familyId } from './family';

export interface attendance_unityAttributes {
  id: number;
  name: string;
  address_fk: number;
}

export type attendance_unityPk = "id";
export type attendance_unityId = attendance_unity[attendance_unityPk];
export type attendance_unityOptionalAttributes = "id";
export type attendance_unityCreationAttributes = Sequelize.InferCreationAttributes<attendance_unity>;

export class attendance_unity extends Model<attendance_unityAttributes, attendance_unityCreationAttributes> implements attendance_unityAttributes {
  id!: number;
  name!: string;
  address_fk!: number;

  // attendance_unity belongsTo address via address_fk
  address_fk_address!: address;
  getAddress_fk_address!: Sequelize.BelongsToGetAssociationMixin<address>;
  setAddress_fk_address!: Sequelize.BelongsToSetAssociationMixin<address, addressId>;
  createAddress_fk_address!: Sequelize.BelongsToCreateAssociationMixin<address>;
  // attendance_unity hasMany attendance via attendance_unity_fk
  attendances!: attendance[];
  getAttendances!: Sequelize.HasManyGetAssociationsMixin<attendance>;
  setAttendances!: Sequelize.HasManySetAssociationsMixin<attendance, attendanceId>;
  addAttendance!: Sequelize.HasManyAddAssociationMixin<attendance, attendanceId>;
  addAttendances!: Sequelize.HasManyAddAssociationsMixin<attendance, attendanceId>;
  createAttendance!: Sequelize.HasManyCreateAssociationMixin<attendance>;
  removeAttendance!: Sequelize.HasManyRemoveAssociationMixin<attendance, attendanceId>;
  removeAttendances!: Sequelize.HasManyRemoveAssociationsMixin<attendance, attendanceId>;
  hasAttendance!: Sequelize.HasManyHasAssociationMixin<attendance, attendanceId>;
  hasAttendances!: Sequelize.HasManyHasAssociationsMixin<attendance, attendanceId>;
  countAttendances!: Sequelize.HasManyCountAssociationsMixin<attendance>;
  // attendance_unity hasMany family via attendance_unity_fk
  families!: family[];
  getFamilies!: Sequelize.HasManyGetAssociationsMixin<family>;
  setFamilies!: Sequelize.HasManySetAssociationsMixin<family, familyId>;
  addFamily!: Sequelize.HasManyAddAssociationMixin<family, familyId>;
  addFamilies!: Sequelize.HasManyAddAssociationsMixin<family, familyId>;
  createFamily!: Sequelize.HasManyCreateAssociationMixin<family>;
  removeFamily!: Sequelize.HasManyRemoveAssociationMixin<family, familyId>;
  removeFamilies!: Sequelize.HasManyRemoveAssociationsMixin<family, familyId>;
  hasFamily!: Sequelize.HasManyHasAssociationMixin<family, familyId>;
  hasFamilies!: Sequelize.HasManyHasAssociationsMixin<family, familyId>;
  countFamilies!: Sequelize.HasManyCountAssociationsMixin<family>;

  static initModel(sequelize: Sequelize.Sequelize): typeof attendance_unity {
    return attendance_unity.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(191),
      allowNull: false
    },
    address_fk: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        table: 'address',
        key: 'id'
      },
      unique: "attendance_unity_address_fk_fkey"
    }
  }, {
    sequelize,
    tableName: 'attendance_unity',
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
        name: "attendance_unity_address_fk_key",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "address_fk" },
        ]
      },
    ]
  });
  }
}
