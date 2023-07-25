import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import { identificacao_usuario, identificacao_usuarioId } from '../../userIdentify/model/userIdentify.model';

export interface situacao_financeiraAttributes {
  id: number;
  profissao: string;
  renda: number;
  reside_familia: string;
  bolsa_familia: number;
  loasbpc: number;
  previdencia: number;
  carteira_assinada: string;
}

export type situacao_financeiraPk = "id";
export type situacao_financeiraId = situacao_financeira[situacao_financeiraPk];
export type situacao_financeiraOptionalAttributes = "id";
export type situacao_financeiraCreationAttributes = Optional<situacao_financeiraAttributes, situacao_financeiraOptionalAttributes>;

export class situacao_financeira extends Model<situacao_financeiraAttributes, situacao_financeiraCreationAttributes> implements situacao_financeiraAttributes {
  id!: number;
  profissao!: string;
  renda!: number;
  reside_familia!: string;
  bolsa_familia!: number;
  loasbpc!: number;
  previdencia!: number;
  carteira_assinada!: string;

  // situacao_financeira hasOne identificacao_usuario via id_situacao_financeira
  identificacao_usuario!: identificacao_usuario;
  getIdentificacao_usuario!: Sequelize.HasOneGetAssociationMixin<identificacao_usuario>;
  setIdentificacao_usuario!: Sequelize.HasOneSetAssociationMixin<identificacao_usuario, identificacao_usuarioId>;
  createIdentificacao_usuario!: Sequelize.HasOneCreateAssociationMixin<identificacao_usuario>;

  static initModel(sequelize: Sequelize.Sequelize): typeof situacao_financeira {

    const model = situacao_financeira.init({
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      profissao: {
        type: DataTypes.STRING(200),
        allowNull: false
      },
      renda: {
        type: DataTypes.DOUBLE,
        allowNull: false
      },
      reside_familia: {
        type: DataTypes.STRING(15),
        allowNull: false
      },
      bolsa_familia: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      loasbpc: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      previdencia: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      carteira_assinada: {
        type: DataTypes.STRING(200),
        allowNull: false
      }
    }, {
      sequelize,
      tableName: 'situacao_financeira',
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

    // situacao_financeira.initModel(sequelize)
    // situacao_financeira.hasMany(identificacao_usuario, {
    //   as: "identificacao_usuario",
    //   foreignKey: "id_situacao_financeira",
    //   sourceKey: "id"
    // });

    return model
  }
}
