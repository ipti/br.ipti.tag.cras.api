import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import { identificacao_usuario, identificacao_usuarioId } from '../../userIdentify/model/userIdentify.model';

export interface enderecoAttributes {
  id: number;
  endereco: string;
  telefone: string;
  ponto_referencia: string;
  condicoes_moradia: string;
  tipo_construcao: string;
  comodos: string;
  valor_aluguel: number;
}

export type enderecoPk = "id";
export type enderecoId = endereco[enderecoPk];
export type enderecoOptionalAttributes = "id";
export type enderecoCreationAttributes = Optional<enderecoAttributes, enderecoOptionalAttributes>;

export class endereco extends Model<enderecoAttributes, enderecoCreationAttributes> implements enderecoAttributes {
  id!: number;
  endereco!: string;
  telefone!: string;
  ponto_referencia!: string;
  condicoes_moradia!: string;
  tipo_construcao!: string;
  comodos!: string;
  valor_aluguel!: number;

  // endereco hasOne identificacao_usuario via id_endereco
  identificacao_usuario!: identificacao_usuario;
  getIdentificacao_usuario!: Sequelize.HasOneGetAssociationMixin<identificacao_usuario>;
  setIdentificacao_usuario!: Sequelize.HasOneSetAssociationMixin<identificacao_usuario, identificacao_usuarioId>;
  createIdentificacao_usuario!: Sequelize.HasOneCreateAssociationMixin<identificacao_usuario>;

  static initModel(sequelize: Sequelize.Sequelize): typeof endereco {

    const model = endereco.init({
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      endereco: {
        type: DataTypes.STRING(250),
        allowNull: false
      },
      telefone: {
        type: DataTypes.STRING(20),
        allowNull: false
      },
      ponto_referencia: {
        type: DataTypes.STRING(200),
        allowNull: false
      },
      condicoes_moradia: {
        type: DataTypes.STRING(200),
        allowNull: false
      },
      tipo_construcao: {
        type: DataTypes.STRING(50),
        allowNull: false
      },
      comodos: {
        type: DataTypes.STRING(50),
        allowNull: false
      },
      valor_aluguel: {
        type: DataTypes.FLOAT,
        allowNull: false
      }
    }, {
      sequelize,
      tableName: 'endereco',
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

    // endereco.initModel(sequelize)

    // endereco.hasOne(identificacao_usuario, {
    //   as: "identificacao_usuario",
    //   foreignKey: "id_endereco",
    //   sourceKey: "id"
    // });
    return model;
  }
}
