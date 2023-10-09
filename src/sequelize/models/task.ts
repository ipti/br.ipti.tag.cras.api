import * as Sequelize from '@sequelize/core';
import { DataTypes, Model } from '@sequelize/core';
import type { attendance, attendanceCreationAttributes, attendanceId } from './attendance';

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

  // task hasOne attendance via task_fk
  attendance!: attendance;
  getAttendance!: Sequelize.HasOneGetAssociationMixin<attendance>;
  setAttendance!: Sequelize.HasOneSetAssociationMixin<attendance, attendanceId>;
  createAttendance!: Sequelize.HasOneCreateAssociationMixin<attendance>;

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
