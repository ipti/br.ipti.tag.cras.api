import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import { identificacao_usuario, identificacao_usuarioId } from '../../userIdentify/model/userIdentify.model';

export interface atendimentosAttributes {
  id: number;
  servico: string;
  solicitacao: string;
  encaminhamento: string;
  resultado: string;
  tecnico: string;
  id_identificacao_usuario: number;
  id_membro_familiar: number;
  data: string;
}

export type atendimentosPk = "id";
export type atendimentosId = atendimentos[atendimentosPk];
export type atendimentosOptionalAttributes = "id";
export type atendimentosCreationAttributes = Optional<atendimentosAttributes, atendimentosOptionalAttributes>;

export class atendimentos extends Model<atendimentosAttributes, atendimentosCreationAttributes> implements atendimentosAttributes {
  id!: number;
  servico!: string;
  solicitacao!: string;
  encaminhamento!: string;
  resultado!: string;
  tecnico!: string;
  id_identificacao_usuario!: number;
  id_membro_familiar!: number;
  data!: string;

  // atendimentos belongsTo identificacao_usuario via id_identificacao_usuario
  id_identificacao_usuario_identificacao_usuario!: identificacao_usuario;
  getId_identificacao_usuario_identificacao_usuario!: Sequelize.BelongsToGetAssociationMixin<identificacao_usuario>;
  setId_identificacao_usuario_identificacao_usuario!: Sequelize.BelongsToSetAssociationMixin<identificacao_usuario, identificacao_usuarioId>;
  createId_identificacao_usuario_identificacao_usuario!: Sequelize.BelongsToCreateAssociationMixin<identificacao_usuario>;

  static initModel(sequelize: Sequelize.Sequelize): typeof atendimentos {
    return atendimentos.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    servico: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    solicitacao: {
      type: DataTypes.STRING(250),
      allowNull: false
    },
    encaminhamento: {
      type: DataTypes.STRING(250),
      allowNull: false
    },
    resultado: {
      type: DataTypes.STRING(250),
      allowNull: false
    },
    tecnico: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    id_identificacao_usuario: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'identificacao_usuario',
        key: 'id'
      }
    },
    id_membro_familiar: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    data: {
      type: DataTypes.DATEONLY,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'atendimentos',
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
        name: "atendimentos_FK",
        using: "BTREE",
        fields: [
          { name: "id_identificacao_usuario" },
        ]
      },
    ]
  });
  }
}
