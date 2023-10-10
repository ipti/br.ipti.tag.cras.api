import * as Sequelize from '@sequelize/core';
import { DataTypes, Model } from '@sequelize/core';
import type { attendance_unity, attendance_unityId } from './attendance_unity';
import type { task, taskId } from './task';
import type { technician, technicianId } from './technician';
import type { user_identify, user_identifyId } from './user_identify';

export interface attendanceAttributes {
  id: number;
  user_identify_fk: number;
  technician_fk: number;
  task_fk: number;
  attendance_unity_fk: number;
  solicitation: string;
  providence: string;
  result: string;
  description: string;
  date: Date;
}

export type attendancePk = "id";
export type attendanceId = attendance[attendancePk];
export type attendanceOptionalAttributes = "id" | "date";
export type attendanceCreationAttributes = Sequelize.InferCreationAttributes<attendance>;

export class attendance extends Model<attendanceAttributes, attendanceCreationAttributes> implements attendanceAttributes {
  id!: number;
  user_identify_fk!: number;
  technician_fk!: number;
  task_fk!: number;
  attendance_unity_fk!: number;
  solicitation!: string;
  providence!: string;
  result!: string;
  description!: string;
  date!: Date;

  // attendance belongsTo attendance_unity via attendance_unity_fk
  attendance_unity_fk_attendance_unity!: attendance_unity;
  getAttendance_unity_fk_attendance_unity!: Sequelize.BelongsToGetAssociationMixin<attendance_unity>;
  setAttendance_unity_fk_attendance_unity!: Sequelize.BelongsToSetAssociationMixin<attendance_unity, attendance_unityId>;
  createAttendance_unity_fk_attendance_unity!: Sequelize.BelongsToCreateAssociationMixin<attendance_unity>;
  // attendance belongsTo task via task_fk
  task_fk_task!: task;
  getTask_fk_task!: Sequelize.BelongsToGetAssociationMixin<task>;
  setTask_fk_task!: Sequelize.BelongsToSetAssociationMixin<task, taskId>;
  createTask_fk_task!: Sequelize.BelongsToCreateAssociationMixin<task>;
  // attendance belongsTo technician via technician_fk
  technician_fk_technician!: technician;
  getTechnician_fk_technician!: Sequelize.BelongsToGetAssociationMixin<technician>;
  setTechnician_fk_technician!: Sequelize.BelongsToSetAssociationMixin<technician, technicianId>;
  createTechnician_fk_technician!: Sequelize.BelongsToCreateAssociationMixin<technician>;
  // attendance belongsTo user_identify via user_identify_fk
  user_identify_fk_user_identify!: user_identify;
  getUser_identify_fk_user_identify!: Sequelize.BelongsToGetAssociationMixin<user_identify>;
  setUser_identify_fk_user_identify!: Sequelize.BelongsToSetAssociationMixin<user_identify, user_identifyId>;
  createUser_identify_fk_user_identify!: Sequelize.BelongsToCreateAssociationMixin<user_identify>;

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
    task_fk: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        table: 'task',
        key: 'id'
      },
      unique: "attendance_task_fk_fkey"
    },
    attendance_unity_fk: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        table: 'attendance_unity',
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
    },
    date: {
      type: DataTypes.DATE(3),
      allowNull: false,
      defaultValue: "current_timestamp(3)"
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
        name: "attendance_task_fk_key",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "task_fk" },
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
      {
        name: "attendance_attendance_unity_fk_fkey",
        using: "BTREE",
        fields: [
          { name: "attendance_unity_fk" },
        ]
      },
    ]
  });
  }
}
