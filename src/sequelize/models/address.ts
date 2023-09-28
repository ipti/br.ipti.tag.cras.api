import * as Sequelize from '@sequelize/core';
import { DataTypes, Model } from '@sequelize/core';
import type { family, familyId } from './family';

export interface addressAttributes {
  id: number;
  address: string;
  telephone: string;
  reference: string;
  conditions: string;
  construction_type: string;
  rooms: string;
  rent_value: number;
}

export type addressPk = "id";
export type addressId = address[addressPk];
export type addressOptionalAttributes = "id";
export type addressCreationAttributes = Sequelize.InferCreationAttributes<address>;

export class address extends Model<addressAttributes, addressCreationAttributes> implements addressAttributes {
  id!: number;
  address!: string;
  telephone!: string;
  reference!: string;
  conditions!: string;
  construction_type!: string;
  rooms!: string;
  rent_value!: number;

  // address hasMany family via address_fk
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

  static initModel(sequelize: Sequelize.Sequelize): typeof address {
    return address.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    address: {
      type: DataTypes.STRING(191),
      allowNull: false
    },
    telephone: {
      type: DataTypes.STRING(191),
      allowNull: false
    },
    reference: {
      type: DataTypes.STRING(191),
      allowNull: false
    },
    conditions: {
      type: DataTypes.STRING(191),
      allowNull: false
    },
    construction_type: {
      type: DataTypes.STRING(191),
      allowNull: false
    },
    rooms: {
      type: DataTypes.STRING(191),
      allowNull: false
    },
    rent_value: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'address',
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
    ]
  });
  }
}
