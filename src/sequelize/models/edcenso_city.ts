import * as Sequelize from '@sequelize/core';
import { DataTypes, Model } from '@sequelize/core';
import type { address, addressId } from './address';
import type { edcenso_uf, edcenso_ufId } from './edcenso_uf';

export interface edcenso_cityAttributes {
  id: number;
  edcenso_uf_fk: number;
  name: string;
  cep_initial?: string;
  cep_final?: string;
  ddd1?: number;
  ddd2?: number;
}

export type edcenso_cityPk = "id";
export type edcenso_cityId = edcenso_city[edcenso_cityPk];
export type edcenso_cityOptionalAttributes = "cep_initial" | "cep_final" | "ddd1" | "ddd2";
export type edcenso_cityCreationAttributes = Sequelize.InferCreationAttributes<edcenso_city>;

export class edcenso_city extends Model<edcenso_cityAttributes, edcenso_cityCreationAttributes> implements edcenso_cityAttributes {
  id!: number;
  edcenso_uf_fk!: number;
  name!: string;
  cep_initial?: string;
  cep_final?: string;
  ddd1?: number;
  ddd2?: number;

  // edcenso_city hasMany address via edcenso_city_fk
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
  // edcenso_city belongsTo edcenso_uf via edcenso_uf_fk
  edcenso_uf_fk_edcenso_uf!: edcenso_uf;
  getEdcenso_uf_fk_edcenso_uf!: Sequelize.BelongsToGetAssociationMixin<edcenso_uf>;
  setEdcenso_uf_fk_edcenso_uf!: Sequelize.BelongsToSetAssociationMixin<edcenso_uf, edcenso_ufId>;
  createEdcenso_uf_fk_edcenso_uf!: Sequelize.BelongsToCreateAssociationMixin<edcenso_uf>;

  static initModel(sequelize: Sequelize.Sequelize): typeof edcenso_city {
    return edcenso_city.init({
    id: {
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
    name: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    cep_initial: {
      type: DataTypes.STRING(9),
      allowNull: true
    },
    cep_final: {
      type: DataTypes.STRING(9),
      allowNull: true
    },
    ddd1: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    ddd2: {
      type: DataTypes.SMALLINT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'edcenso_city',
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
      {
        name: "edcenso_uf_fk",
        using: "BTREE",
        fields: [
          { name: "edcenso_uf_fk" },
        ]
      },
    ]
  });
  }
}
