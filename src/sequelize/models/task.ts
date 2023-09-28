import * as Sequelize from '@sequelize/core';
import { DataTypes, Model } from '@sequelize/core';

export interface taskAttributes {
  id: number;
  attendance_fk: number;
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
  attendance_fk!: number;
  name!: string;
  description?: string;
  createdAt!: Date;
  updatedAt!: Date;


  static initModel(sequelize: Sequelize.Sequelize): typeof task {
    return task.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    attendance_fk: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        table: 'attendance',
        key: 'id'
      }
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
      {
        name: "task_attendance_fk_fkey",
        using: "BTREE",
        fields: [
          { name: "attendance_fk" },
        ]
      },
    ]
  });
  }
}
