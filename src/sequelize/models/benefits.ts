import * as Sequelize from '@sequelize/core';
import { DataTypes, Model } from '@sequelize/core';
import type { family, familyId } from './family';

export interface benefitsAttributes {
  id: number;
  description: string;
  value: number;
  type: 'PERIODICO' | 'EVENTUAL';
}

export type benefitsPk = "id";
export type benefitsId = benefits[benefitsPk];
export type benefitsOptionalAttributes = "id";
export type benefitsCreationAttributes = Sequelize.InferCreationAttributes<benefits>;

export class benefits extends Model<benefitsAttributes, benefitsCreationAttributes> implements benefitsAttributes {
  id!: number;
  description!: string;
  value!: number;
  type!: 'PERIODICO' | 'EVENTUAL';

  // benefits hasMany family via benefit_fk
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
    value: {
      type: DataTypes.INTEGER,
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
