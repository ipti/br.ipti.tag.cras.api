import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface servicoAttributes {
  id: number;
  nome: string;
}

export type servicoPk = "id";
export type servicoId = servico[servicoPk];
export type servicoOptionalAttributes = "id";
export type servicoCreationAttributes = Optional<servicoAttributes, servicoOptionalAttributes>;

export class servico extends Model<servicoAttributes, servicoCreationAttributes> implements servicoAttributes {
  id!: number;
  nome!: string;


  static initModel(sequelize: Sequelize.Sequelize): typeof servico {
    return servico.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nome: {
      type: DataTypes.STRING(200),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'servico',
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
