import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import { identificacao_usuario, identificacao_usuarioId } from '../../userIdentify/model/userIdentify.model';

export interface membro_familiarAttributes {
  id: number;
  id_identificacao_usuario: number;
  nome: string;
  parentesco: string;
  idade: number;
  sexo: string;
  nis: number;
  loas: number;
  bolsaFamilia: number;
  previdencia: number;
  renda: number;
}

export type membro_familiarPk = "id";
export type membro_familiarId = membro_familiar[membro_familiarPk];
export type membro_familiarOptionalAttributes = "id";
export type membro_familiarCreationAttributes = Optional<membro_familiarAttributes, membro_familiarOptionalAttributes>;

export class membro_familiar extends Model<membro_familiarAttributes, membro_familiarCreationAttributes> implements membro_familiarAttributes {
  id!: number;
  id_identificacao_usuario!: number;
  nome!: string;
  parentesco!: string;
  idade!: number;
  sexo!: string;
  nis!: number;
  loas!: number;
  bolsaFamilia!: number;
  previdencia!: number;
  renda!: number;

  // membro_familiar belongsTo identificacao_usuario via id_identificacao_usuario
  id_identificacao_usuario_identificacao_usuario!: identificacao_usuario;
  getId_identificacao_usuario_identificacao_usuario!: Sequelize.BelongsToGetAssociationMixin<identificacao_usuario>;
  setId_identificacao_usuario_identificacao_usuario!: Sequelize.BelongsToSetAssociationMixin<identificacao_usuario, identificacao_usuarioId>;
  createId_identificacao_usuario_identificacao_usuario!: Sequelize.BelongsToCreateAssociationMixin<identificacao_usuario>;

  static initModel(sequelize: Sequelize.Sequelize): typeof membro_familiar {
    return membro_familiar.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_identificacao_usuario: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'identificacao_usuario',
        key: 'id'
      }
    },
    nome: {
      type: DataTypes.STRING(250),
      allowNull: false
    },
    parentesco: {
      type: DataTypes.STRING(150),
      allowNull: false
    },
    idade: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    sexo: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    nis: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    loas: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    bolsaFamilia: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    previdencia: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    renda: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'membro_familiar',
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
        name: "membro_familiar_FK",
        using: "BTREE",
        fields: [
          { name: "id_identificacao_usuario" },
        ]
      },
    ]
  });
  }
}
