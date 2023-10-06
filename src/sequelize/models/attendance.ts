import * as Sequelize from '@sequelize/core';
import { DataTypes, Model } from '@sequelize/core';
import type { task, taskId } from './task';

export interface attendanceAttributes {
  id: number;
  user_identify_fk: number;
  technician_fk: number;
  solicitation: string;
  providence: string;
  result: string;
  description: string;
}

export type attendancePk = "id";
export type attendanceId = attendance[attendancePk];
export type attendanceOptionalAttributes = "id";
export type attendanceCreationAttributes = Sequelize.InferCreationAttributes<attendance>;

export class attendance extends Model<attendanceAttributes, attendanceCreationAttributes> implements attendanceAttributes {
  id!: number;
  user_identify_fk!: number;
  technician_fk!: number;
  solicitation!: string;
  providence!: string;
  result!: string;
  description!: string;

  // attendance hasMany task via attendance_fk
  tasks!: task[];
  getTasks!: Sequelize.HasManyGetAssociationsMixin<task>;
  setTasks!: Sequelize.HasManySetAssociationsMixin<task, taskId>;
  addTask!: Sequelize.HasManyAddAssociationMixin<task, taskId>;
  addTasks!: Sequelize.HasManyAddAssociationsMixin<task, taskId>;
  createTask!: Sequelize.HasManyCreateAssociationMixin<task>;
  removeTask!: Sequelize.HasManyRemoveAssociationMixin<task, taskId>;
  removeTasks!: Sequelize.HasManyRemoveAssociationsMixin<task, taskId>;
  hasTask!: Sequelize.HasManyHasAssociationMixin<task, taskId>;
  hasTasks!: Sequelize.HasManyHasAssociationsMixin<task, taskId>;
  countTasks!: Sequelize.HasManyCountAssociationsMixin<task>;

  static initModel(sequelize: Sequelize.Sequelize): typeof attendance {
    return attendance.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    user_identify_fk: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        table: 'user_identify',
        key: 'id'
      }
    },
    technician_fk: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        table: 'technician',
        key: 'id'
      }
    },
    solicitation: {
      type: DataTypes.STRING(191),
      allowNull: false
    },
    providence: {
      type: DataTypes.STRING(191),
      allowNull: false
    },
    result: {
      type: DataTypes.STRING(191),
      allowNull: false
    },
    description: {
      type: DataTypes.STRING(191),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'attendance',
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
        name: "attendance_user_identify_fk_fkey",
        using: "BTREE",
        fields: [
          { name: "user_identify_fk" },
        ]
      },
      {
        name: "attendance_technician_fk_fkey",
        using: "BTREE",
        fields: [
          { name: "technician_fk" },
        ]
      },
    ]
  });
  }
}
