import * as Sequelize from '@sequelize/core';
import { DataTypes, Model } from '@sequelize/core';
import type { attendance, attendanceId } from './attendance';
import type { user, userId } from './user';

export interface technicianAttributes {
  id: number;
  name: string;
  user_fk?: number;
}

export type technicianPk = "id";
export type technicianId = technician[technicianPk];
export type technicianOptionalAttributes = "id" | "user_fk";
export type technicianCreationAttributes = Sequelize.InferCreationAttributes<technician>;

export class technician extends Model<technicianAttributes, technicianCreationAttributes> implements technicianAttributes {
  id!: number;
  name!: string;
  user_fk?: number;

  // technician hasMany attendance via technician_fk
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
  // technician belongsTo user via user_fk
  user_fk_user!: user;
  getUser_fk_user!: Sequelize.BelongsToGetAssociationMixin<user>;
  setUser_fk_user!: Sequelize.BelongsToSetAssociationMixin<user, userId>;
  createUser_fk_user!: Sequelize.BelongsToCreateAssociationMixin<user>;

  static initModel(sequelize: Sequelize.Sequelize): typeof technician {
    return technician.init({
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
    user_fk: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        table: 'user',
        key: 'id'
      },
      unique: "technician_user_fk_fkey"
    }
  }, {
    sequelize,
    tableName: 'technician',
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
        name: "technician_user_fk_key",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "user_fk" },
        ]
      },
    ]
  });
  }
}
