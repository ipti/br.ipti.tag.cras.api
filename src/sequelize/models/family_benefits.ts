import * as Sequelize from '@sequelize/core';
import { DataTypes, Model } from '@sequelize/core';
import type { benefits, benefitsId } from './benefits';
import type { family, familyId } from './family';

export interface family_benefitsAttributes {
  id: number;
  family_fk: number;
  benefits_fk: number;
  value: number;
}

export type family_benefitsPk = "id";
export type family_benefitsId = family_benefits[family_benefitsPk];
export type family_benefitsOptionalAttributes = "id";
export type family_benefitsCreationAttributes = Sequelize.InferCreationAttributes<family_benefits>;

export class family_benefits extends Model<family_benefitsAttributes, family_benefitsCreationAttributes> implements family_benefitsAttributes {
  id!: number;
  family_fk!: number;
  benefits_fk!: number;
  value!: number;

  // family_benefits belongsTo benefits via benefits_fk
  benefits_fk_benefit!: benefits;
  getBenefits_fk_benefit!: Sequelize.BelongsToGetAssociationMixin<benefits>;
  setBenefits_fk_benefit!: Sequelize.BelongsToSetAssociationMixin<benefits, benefitsId>;
  createBenefits_fk_benefit!: Sequelize.BelongsToCreateAssociationMixin<benefits>;
  // family_benefits belongsTo family via family_fk
  family_fk_family!: family;
  getFamily_fk_family!: Sequelize.BelongsToGetAssociationMixin<family>;
  setFamily_fk_family!: Sequelize.BelongsToSetAssociationMixin<family, familyId>;
  createFamily_fk_family!: Sequelize.BelongsToCreateAssociationMixin<family>;

  static initModel(sequelize: Sequelize.Sequelize): typeof family_benefits {
    return family_benefits.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    family_fk: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        table: 'family',
        key: 'id'
      }
    },
    benefits_fk: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        table: 'benefits',
        key: 'id'
      }
    },
    value: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'family_benefits',
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
        name: "family_benefits_family_fk_fkey",
        using: "BTREE",
        fields: [
          { name: "family_fk" },
        ]
      },
      {
        name: "family_benefits_benefits_fk_fkey",
        using: "BTREE",
        fields: [
          { name: "benefits_fk" },
        ]
      },
    ]
  });
  }
}
