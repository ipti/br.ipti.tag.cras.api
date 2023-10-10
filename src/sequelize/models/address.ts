import * as Sequelize from '@sequelize/core';
import { DataTypes, Model } from '@sequelize/core';
import type { attendance_unity, attendance_unityCreationAttributes, attendance_unityId } from './attendance_unity';
import type { edcenso_city, edcenso_cityId } from './edcenso_city';
import type { edcenso_uf, edcenso_ufId } from './edcenso_uf';
import type { family, familyId } from './family';

export interface addressAttributes {
  id: number;
  edcenso_uf_fk: number;
  edcenso_city_fk: number;
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
  edcenso_uf_fk!: number;
  edcenso_city_fk!: number;
  address!: string;
  telephone!: string;
  reference!: string;
  conditions!: string;
  construction_type!: string;
  rooms!: string;
  rent_value!: number;

  // address hasOne attendance_unity via address_fk
  attendance_unity!: attendance_unity;
  getAttendance_unity!: Sequelize.HasOneGetAssociationMixin<attendance_unity>;
  setAttendance_unity!: Sequelize.HasOneSetAssociationMixin<attendance_unity, attendance_unityId>;
  createAttendance_unity!: Sequelize.HasOneCreateAssociationMixin<attendance_unity>;
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
  // address belongsTo edcenso_city via edcenso_city_fk
  edcenso_city_fk_edcenso_city!: edcenso_city;
  getEdcenso_city_fk_edcenso_city!: Sequelize.BelongsToGetAssociationMixin<edcenso_city>;
  setEdcenso_city_fk_edcenso_city!: Sequelize.BelongsToSetAssociationMixin<edcenso_city, edcenso_cityId>;
  createEdcenso_city_fk_edcenso_city!: Sequelize.BelongsToCreateAssociationMixin<edcenso_city>;
  // address belongsTo edcenso_uf via edcenso_uf_fk
  edcenso_uf_fk_edcenso_uf!: edcenso_uf;
  getEdcenso_uf_fk_edcenso_uf!: Sequelize.BelongsToGetAssociationMixin<edcenso_uf>;
  setEdcenso_uf_fk_edcenso_uf!: Sequelize.BelongsToSetAssociationMixin<edcenso_uf, edcenso_ufId>;
  createEdcenso_uf_fk_edcenso_uf!: Sequelize.BelongsToCreateAssociationMixin<edcenso_uf>;

  static initModel(sequelize: Sequelize.Sequelize): typeof address {
    return address.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    edcenso_uf_fk: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        table: 'edcenso_uf',
        key: 'id'
      }
    },
    edcenso_city_fk: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        table: 'edcenso_city',
        key: 'id'
      }
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
      {
        name: "address_edcenso_uf_fk_fkey",
        using: "BTREE",
        fields: [
          { name: "edcenso_uf_fk" },
        ]
      },
      {
        name: "address_edcenso_city_fk_fkey",
        using: "BTREE",
        fields: [
          { name: "edcenso_city_fk" },
        ]
      },
    ]
  });
  }
}
