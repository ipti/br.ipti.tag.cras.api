import * as Sequelize from '@sequelize/core';
import { DataTypes, Model } from '@sequelize/core';
import type { technician, technicianCreationAttributes, technicianId } from './technician';

export interface userAttributes {
  id: number;
  name: string;
  username: string;
  email: string;
  password: string;
  role: 'SECRETARY' | 'TECHNICIAN';
  createdAt: Date;
  updatedAt: Date;
}

export type userPk = "id";
export type userId = user[userPk];
export type userOptionalAttributes = "id" | "role" | "createdAt" | "updatedAt";
export type userCreationAttributes = Sequelize.InferCreationAttributes<user>;

export class user extends Model<userAttributes, userCreationAttributes> implements userAttributes {
  id!: number;
  name!: string;
  username!: string;
  email!: string;
  password!: string;
  role!: 'SECRETARY' | 'TECHNICIAN';
  createdAt!: Date;
  updatedAt!: Date;

  // user hasOne technician via user_fk
  technician!: technician;
  getTechnician!: Sequelize.HasOneGetAssociationMixin<technician>;
  setTechnician!: Sequelize.HasOneSetAssociationMixin<technician, technicianId>;
  createTechnician!: Sequelize.HasOneCreateAssociationMixin<technician>;

  static initModel(sequelize: Sequelize.Sequelize): typeof user {
    return user.init({
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
    username: {
      type: DataTypes.STRING(191),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(191),
      allowNull: false,
      unique: "user_email_key"
    },
    password: {
      type: DataTypes.STRING(191),
      allowNull: false
    },
    role: {
      type: DataTypes.ENUM('SECRETARY','TECHNICIAN'),
      allowNull: false,
      defaultValue: "TECHNICIAN"
    }
  }, {
    sequelize,
    tableName: 'user',
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
        name: "user_email_key",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "email" },
        ]
      },
    ]
  });
  }
}
