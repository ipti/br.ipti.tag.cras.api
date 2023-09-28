import * as Sequelize from '@sequelize/core';
import { DataTypes, Model } from '@sequelize/core';
import type { attendance, attendanceId } from './attendance';

export interface user_identifyAttributes {
  id: number;
  vulnerability_fk: number;
  family_fk: number;
  name: string;
  surname: string;
  folder?: string;
  archive?: string;
  number?: string;
  birthday?: string;
  birth_certificate?: number;
  nis?: number;
  rg_number?: string;
  rg_date_emission?: string;
  uf_rg?: string;
  emission_rg?: string;
  cpf: string;
  is_deficiency: number;
  deficiency: string;
  mother: string;
  father: string;
  marital_status: string;
  escolarity: string;
  initial_date: string;
  final_date?: string;
  profission?: string;
  income: number;
}

export type user_identifyPk = "id";
export type user_identifyId = user_identify[user_identifyPk];
export type user_identifyOptionalAttributes = "id" | "folder" | "archive" | "number" | "birthday" | "birth_certificate" | "nis" | "rg_number" | "rg_date_emission" | "uf_rg" | "emission_rg" | "final_date" | "profission" | "income";
export type user_identifyCreationAttributes = Sequelize.InferCreationAttributes<user_identify>;

export class user_identify extends Model<user_identifyAttributes, user_identifyCreationAttributes> implements user_identifyAttributes {
  id!: number;
  vulnerability_fk!: number;
  family_fk!: number;
  name!: string;
  surname!: string;
  folder?: string;
  archive?: string;
  number?: string;
  birthday?: string;
  birth_certificate?: number;
  nis?: number;
  rg_number?: string;
  rg_date_emission?: string;
  uf_rg?: string;
  emission_rg?: string;
  cpf!: string;
  is_deficiency!: number;
  deficiency!: string;
  mother!: string;
  father!: string;
  marital_status!: string;
  escolarity!: string;
  initial_date!: string;
  final_date?: string;
  profission?: string;
  income!: number;

  // user_identify hasMany attendance via user_identify_fk
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

  static initModel(sequelize: Sequelize.Sequelize): typeof user_identify {
    return user_identify.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    vulnerability_fk: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        table: 'vulnerability',
        key: 'id'
      }
    },
    family_fk: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        table: 'family',
        key: 'id'
      }
    },
    name: {
      type: DataTypes.STRING(191),
      allowNull: false
    },
    surname: {
      type: DataTypes.STRING(191),
      allowNull: false
    },
    folder: {
      type: DataTypes.STRING(191),
      allowNull: true
    },
    archive: {
      type: DataTypes.STRING(191),
      allowNull: true
    },
    number: {
      type: DataTypes.STRING(191),
      allowNull: true
    },
    birthday: {
      type: DataTypes.STRING(191),
      allowNull: true
    },
    birth_certificate: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    nis: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    rg_number: {
      type: DataTypes.STRING(191),
      allowNull: true
    },
    rg_date_emission: {
      type: DataTypes.STRING(191),
      allowNull: true
    },
    uf_rg: {
      type: DataTypes.STRING(191),
      allowNull: true
    },
    emission_rg: {
      type: DataTypes.STRING(191),
      allowNull: true
    },
    cpf: {
      type: DataTypes.STRING(191),
      allowNull: false
    },
    is_deficiency: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    deficiency: {
      type: DataTypes.STRING(191),
      allowNull: false
    },
    mother: {
      type: DataTypes.STRING(191),
      allowNull: false
    },
    father: {
      type: DataTypes.STRING(191),
      allowNull: false
    },
    marital_status: {
      type: DataTypes.STRING(191),
      allowNull: false
    },
    escolarity: {
      type: DataTypes.STRING(191),
      allowNull: false
    },
    initial_date: {
      type: DataTypes.STRING(191),
      allowNull: false
    },
    final_date: {
      type: DataTypes.STRING(191),
      allowNull: true
    },
    profission: {
      type: DataTypes.STRING(191),
      allowNull: true
    },
    income: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'user_identify',
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
        name: "user_identify_vulnerability_fk_fkey",
        using: "BTREE",
        fields: [
          { name: "vulnerability_fk" },
        ]
      },
      {
        name: "user_identify_family_fk_fkey",
        using: "BTREE",
        fields: [
          { name: "family_fk" },
        ]
      },
    ]
  });
  }
}
