import * as Sequelize from '@sequelize/core';
import { DataTypes, Model } from '@sequelize/core';
import type { user_identify, user_identifyId } from './user_identify';

export interface familyAttributes {
  id: number;
  family_representative_fk: number;
  address_fk: number;
  benefit_fk: number;
}

export type familyPk = "id";
export type familyId = family[familyPk];
export type familyOptionalAttributes = "id";
export type familyCreationAttributes = Sequelize.InferCreationAttributes<family>;

export class family extends Model<familyAttributes, familyCreationAttributes> implements familyAttributes {
  id!: number;
  family_representative_fk!: number;
  address_fk!: number;
  benefit_fk!: number;

  // family hasMany user_identify via family_fk
  user_identifies!: user_identify[];
  getUser_identifies!: Sequelize.HasManyGetAssociationsMixin<user_identify>;
  setUser_identifies!: Sequelize.HasManySetAssociationsMixin<user_identify, user_identifyId>;
  addUser_identify!: Sequelize.HasManyAddAssociationMixin<user_identify, user_identifyId>;
  addUser_identifies!: Sequelize.HasManyAddAssociationsMixin<user_identify, user_identifyId>;
  createUser_identify!: Sequelize.HasManyCreateAssociationMixin<user_identify>;
  removeUser_identify!: Sequelize.HasManyRemoveAssociationMixin<user_identify, user_identifyId>;
  removeUser_identifies!: Sequelize.HasManyRemoveAssociationsMixin<user_identify, user_identifyId>;
  hasUser_identify!: Sequelize.HasManyHasAssociationMixin<user_identify, user_identifyId>;
  hasUser_identifies!: Sequelize.HasManyHasAssociationsMixin<user_identify, user_identifyId>;
  countUser_identifies!: Sequelize.HasManyCountAssociationsMixin<user_identify>;

  static initModel(sequelize: Sequelize.Sequelize): typeof family {
    return family.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    family_representative_fk: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    address_fk: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        table: 'address',
        key: 'id'
      }
    },
    benefit_fk: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        table: 'benefits',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'family',
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
        name: "family_address_fk_fkey",
        using: "BTREE",
        fields: [
          { name: "address_fk" },
        ]
      },
      {
        name: "family_benefit_fk_fkey",
        using: "BTREE",
        fields: [
          { name: "benefit_fk" },
        ]
      },
    ]
  });
  }
}
