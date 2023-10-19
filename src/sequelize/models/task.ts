import * as Sequelize from '@sequelize/core';
import { DataTypes, Model } from '@sequelize/core';
import type { attendance, attendanceId } from './attendance';

export interface taskAttributes {
  id: number;
  name: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

export type taskPk = "id";
export type taskId = task[taskPk];
export type taskOptionalAttributes = "id" | "description" | "createdAt" | "updatedAt";
export type taskCreationAttributes = Sequelize.InferCreationAttributes<task>;

export class task extends Model<taskAttributes, taskCreationAttributes> implements taskAttributes {
  id!: number;
  name!: string;
  description?: string;
  createdAt!: Date;
  updatedAt!: Date;

  // task hasMany attendance via task_fk
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

  static initModel(sequelize: Sequelize.Sequelize): typeof task {
    return task.init({
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
    description: {
      type: DataTypes.STRING(191),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'task',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
