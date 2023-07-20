import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface tecnicoAttributes {
  id: number;
  name: string;
}

export type tecnicoPk = "id";
export type tecnicoId = tecnico[tecnicoPk];
export type tecnicoOptionalAttributes = "id";
export type tecnicoCreationAttributes = Optional<tecnicoAttributes, tecnicoOptionalAttributes>;

export class tecnico extends Model<tecnicoAttributes, tecnicoCreationAttributes> implements tecnicoAttributes {
  id!: number;
  name!: string;


  static initModel(sequelize: Sequelize.Sequelize): typeof tecnico {
    return tecnico.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(200),
      allowNull: false
    }
  }, {
    sequelize: sequelize,
    tableName: 'tecnico',
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
