import * as Sequelize from '@sequelize/core';
import { DataTypes, Model } from '@sequelize/core';
import type { family_benefits, family_benefitsId } from './family_benefits';

export interface benefitsAttributes {
  id: number;
  description: string;
  type: 'PERIODICO' | 'EVENTUAL';
}

export type benefitsPk = "id";
export type benefitsId = benefits[benefitsPk];
export type benefitsOptionalAttributes = "id";
export type benefitsCreationAttributes = Sequelize.InferCreationAttributes<benefits>;

export class benefits extends Model<benefitsAttributes, benefitsCreationAttributes> implements benefitsAttributes {
  id!: number;
  description!: string;
  type!: 'PERIODICO' | 'EVENTUAL';

  // benefits hasMany family_benefits via benefits_fk
  family_benefits!: family_benefits[];
  getFamily_benefits!: Sequelize.HasManyGetAssociationsMixin<family_benefits>;
  setFamily_benefits!: Sequelize.HasManySetAssociationsMixin<family_benefits, family_benefitsId>;
  addFamily_benefit!: Sequelize.HasManyAddAssociationMixin<family_benefits, family_benefitsId>;
  addFamily_benefits!: Sequelize.HasManyAddAssociationsMixin<family_benefits, family_benefitsId>;
  createFamily_benefit!: Sequelize.HasManyCreateAssociationMixin<family_benefits>;
  removeFamily_benefit!: Sequelize.HasManyRemoveAssociationMixin<family_benefits, family_benefitsId>;
  removeFamily_benefits!: Sequelize.HasManyRemoveAssociationsMixin<family_benefits, family_benefitsId>;
  hasFamily_benefit!: Sequelize.HasManyHasAssociationMixin<family_benefits, family_benefitsId>;
  hasFamily_benefits!: Sequelize.HasManyHasAssociationsMixin<family_benefits, family_benefitsId>;
  countFamily_benefits!: Sequelize.HasManyCountAssociationsMixin<family_benefits>;

  static initModel(sequelize: Sequelize.Sequelize): typeof benefits {
    return benefits.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    description: {
      type: DataTypes.STRING(191),
      allowNull: false
    },
    type: {
      type: DataTypes.ENUM('PERIODICO','EVENTUAL'),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'benefits',
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
