import * as Sequelize from '@sequelize/core';
import { DataTypes, Model } from '@sequelize/core';
import type { address, addressId } from './address';
import type { edcenso_city, edcenso_cityId } from './edcenso_city';

export interface edcenso_ufAttributes {
  id: number;
  acronym: string;
  name: string;
}

export type edcenso_ufPk = "id";
export type edcenso_ufId = edcenso_uf[edcenso_ufPk];
export type edcenso_ufCreationAttributes = edcenso_ufAttributes;

export class edcenso_uf extends Model<edcenso_ufAttributes, edcenso_ufCreationAttributes> implements edcenso_ufAttributes {
  id!: number;
  acronym!: string;
  name!: string;

  // edcenso_uf hasMany address via edcenso_uf_fk
  addresses!: address[];
  getAddresses!: Sequelize.HasManyGetAssociationsMixin<address>;
  setAddresses!: Sequelize.HasManySetAssociationsMixin<address, addressId>;
  addAddress!: Sequelize.HasManyAddAssociationMixin<address, addressId>;
  addAddresses!: Sequelize.HasManyAddAssociationsMixin<address, addressId>;
  createAddress!: Sequelize.HasManyCreateAssociationMixin<address>;
  removeAddress!: Sequelize.HasManyRemoveAssociationMixin<address, addressId>;
  removeAddresses!: Sequelize.HasManyRemoveAssociationsMixin<address, addressId>;
  hasAddress!: Sequelize.HasManyHasAssociationMixin<address, addressId>;
  hasAddresses!: Sequelize.HasManyHasAssociationsMixin<address, addressId>;
  countAddresses!: Sequelize.HasManyCountAssociationsMixin<address>;
  // edcenso_uf hasMany edcenso_city via edcenso_uf_fk
  edcenso_cities!: edcenso_city[];
  getEdcenso_cities!: Sequelize.HasManyGetAssociationsMixin<edcenso_city>;
  setEdcenso_cities!: Sequelize.HasManySetAssociationsMixin<edcenso_city, edcenso_cityId>;
  addEdcenso_city!: Sequelize.HasManyAddAssociationMixin<edcenso_city, edcenso_cityId>;
  addEdcenso_cities!: Sequelize.HasManyAddAssociationsMixin<edcenso_city, edcenso_cityId>;
  createEdcenso_city!: Sequelize.HasManyCreateAssociationMixin<edcenso_city>;
  removeEdcenso_city!: Sequelize.HasManyRemoveAssociationMixin<edcenso_city, edcenso_cityId>;
  removeEdcenso_cities!: Sequelize.HasManyRemoveAssociationsMixin<edcenso_city, edcenso_cityId>;
  hasEdcenso_city!: Sequelize.HasManyHasAssociationMixin<edcenso_city, edcenso_cityId>;
  hasEdcenso_cities!: Sequelize.HasManyHasAssociationsMixin<edcenso_city, edcenso_cityId>;
  countEdcenso_cities!: Sequelize.HasManyCountAssociationsMixin<edcenso_city>;

  static initModel(sequelize: Sequelize.Sequelize): typeof edcenso_uf {
    return edcenso_uf.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    acronym: {
      type: DataTypes.STRING(2),
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(20),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'edcenso_uf',
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
        name: "id",
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
