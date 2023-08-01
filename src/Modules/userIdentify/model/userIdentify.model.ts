import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import { endereco, enderecoId } from '../../address/model/address.model';
import { atendimentos, atendimentosId } from '../../customServices/model/customservices.model';
import { control_attendance, control_attendanceId } from '../../controlAttendance/model/controlAttendance.model';
import { membro_familiar, membro_familiarId } from '../../familyMember/model/familyMember.model';
import { situacao_financeira, situacao_financeiraId } from '../../financialSituation/model/financialsSituation.model';
import { vulnerabilidade, vulnerabilidadeId } from '../../vulnerability/model/vulnerability.model';

export interface identificacao_usuarioAttributes {
  id: number;
  id_endereco: number;
  id_situacao_financeira: number;
  id_vulnerabilidade: number;
  nome: string;
  apelido: string;
  pasta?: string;
  arquivo?: string;
  nº?: string;
  data_nascimento?: string;
  certidao_nascimento?: number;
  NIS?: number;
  numero_rg?: string;
  data_emissao_rg?: string;
  uf_rg?: string;
  emissao_rg?: string;
  cpf: string;
  deficiente: string;
  deficiencia: string;
  mae: string;
  pai: string;
  estado_civil: string;
  escolaridade: string;
  data_inicial: string;
  data_final?: string;
}

export type identificacao_usuarioPk = "id";
export type identificacao_usuarioId = identificacao_usuario[identificacao_usuarioPk];
export type identificacao_usuarioOptionalAttributes = "id" | "data_nascimento" | "certidao_nascimento" | "NIS" | "numero_rg" | "data_emissao_rg" | "uf_rg" | "emissao_rg" | "data_final";
export type identificacao_usuarioCreationAttributes = Optional<identificacao_usuarioAttributes, identificacao_usuarioOptionalAttributes>;

export class identificacao_usuario extends Model<identificacao_usuarioAttributes, identificacao_usuarioCreationAttributes> implements identificacao_usuarioAttributes {
  id!: number;
  id_endereco!: number;
  id_situacao_financeira!: number;
  id_vulnerabilidade!: number;
  nome!: string;
  apelido!: string;
  data_nascimento?: string;
  certidao_nascimento?: number;
  NIS?: number;
  pasta?: string;
  arquivo?: string;
  nº?: string;
  numero_rg?: string;
  data_emissao_rg?: string;
  uf_rg?: string;
  emissao_rg?: string;
  cpf!: string;
  deficiente!: string;
  deficiencia!: string;
  mae!: string;
  pai!: string;
  estado_civil!: string;
  escolaridade!: string;
  data_inicial!: string;
  data_final?: string;

  // identificacao_usuario belongsTo endereco via id_endereco
  id_endereco_endereco!: endereco;
  getId_endereco_endereco!: Sequelize.BelongsToGetAssociationMixin<endereco>;
  setId_endereco_endereco!: Sequelize.BelongsToSetAssociationMixin<endereco, enderecoId>;
  createId_endereco_endereco!: Sequelize.BelongsToCreateAssociationMixin<endereco>;
  // identificacao_usuario hasMany atendimentos via id_identificacao_usuario
  atendimentos!: atendimentos[];
  getAtendimentos!: Sequelize.HasManyGetAssociationsMixin<atendimentos>;
  setAtendimentos!: Sequelize.HasManySetAssociationsMixin<atendimentos, atendimentosId>;
  addAtendimento!: Sequelize.HasManyAddAssociationMixin<atendimentos, atendimentosId>;
  addAtendimentos!: Sequelize.HasManyAddAssociationsMixin<atendimentos, atendimentosId>;
  createAtendimento!: Sequelize.HasManyCreateAssociationMixin<atendimentos>;
  removeAtendimento!: Sequelize.HasManyRemoveAssociationMixin<atendimentos, atendimentosId>;
  removeAtendimentos!: Sequelize.HasManyRemoveAssociationsMixin<atendimentos, atendimentosId>;
  hasAtendimento!: Sequelize.HasManyHasAssociationMixin<atendimentos, atendimentosId>;
  hasAtendimentos!: Sequelize.HasManyHasAssociationsMixin<atendimentos, atendimentosId>;
  countAtendimentos!: Sequelize.HasManyCountAssociationsMixin;
  // identificacao_usuario hasMany control_attendance via id_identification_Person
  control_attendances!: control_attendance[];
  getControl_attendances!: Sequelize.HasManyGetAssociationsMixin<control_attendance>;
  setControl_attendances!: Sequelize.HasManySetAssociationsMixin<control_attendance, control_attendanceId>;
  addControl_attendance!: Sequelize.HasManyAddAssociationMixin<control_attendance, control_attendanceId>;
  addControl_attendances!: Sequelize.HasManyAddAssociationsMixin<control_attendance, control_attendanceId>;
  createControl_attendance!: Sequelize.HasManyCreateAssociationMixin<control_attendance>;
  removeControl_attendance!: Sequelize.HasManyRemoveAssociationMixin<control_attendance, control_attendanceId>;
  removeControl_attendances!: Sequelize.HasManyRemoveAssociationsMixin<control_attendance, control_attendanceId>;
  hasControl_attendance!: Sequelize.HasManyHasAssociationMixin<control_attendance, control_attendanceId>;
  hasControl_attendances!: Sequelize.HasManyHasAssociationsMixin<control_attendance, control_attendanceId>;
  countControl_attendances!: Sequelize.HasManyCountAssociationsMixin;
  // identificacao_usuario hasMany membro_familiar via id_identificacao_usuario
  membro_familiars!: membro_familiar[];
  getMembro_familiars!: Sequelize.HasManyGetAssociationsMixin<membro_familiar>;
  setMembro_familiars!: Sequelize.HasManySetAssociationsMixin<membro_familiar, membro_familiarId>;
  addMembro_familiar!: Sequelize.HasManyAddAssociationMixin<membro_familiar, membro_familiarId>;
  addMembro_familiars!: Sequelize.HasManyAddAssociationsMixin<membro_familiar, membro_familiarId>;
  createMembro_familiar!: Sequelize.HasManyCreateAssociationMixin<membro_familiar>;
  removeMembro_familiar!: Sequelize.HasManyRemoveAssociationMixin<membro_familiar, membro_familiarId>;
  removeMembro_familiars!: Sequelize.HasManyRemoveAssociationsMixin<membro_familiar, membro_familiarId>;
  hasMembro_familiar!: Sequelize.HasManyHasAssociationMixin<membro_familiar, membro_familiarId>;
  hasMembro_familiars!: Sequelize.HasManyHasAssociationsMixin<membro_familiar, membro_familiarId>;
  countMembro_familiars!: Sequelize.HasManyCountAssociationsMixin;
  // identificacao_usuario belongsTo situacao_financeira via id_situacao_financeira
  id_situacao_financeira_situacao_financeira!: situacao_financeira;
  getId_situacao_financeira_situacao_financeira!: Sequelize.BelongsToGetAssociationMixin<situacao_financeira>;
  setId_situacao_financeira_situacao_financeira!: Sequelize.BelongsToSetAssociationMixin<situacao_financeira, situacao_financeiraId>;
  createId_situacao_financeira_situacao_financeira!: Sequelize.BelongsToCreateAssociationMixin<situacao_financeira>;
  // identificacao_usuario belongsTo vulnerabilidade via id_vulnerabilidade
  id_vulnerabilidade_vulnerabilidade!: vulnerabilidade;
  getId_vulnerabilidade_vulnerabilidade!: Sequelize.BelongsToGetAssociationMixin<vulnerabilidade>;
  setId_vulnerabilidade_vulnerabilidade!: Sequelize.BelongsToSetAssociationMixin<vulnerabilidade, vulnerabilidadeId>;
  createId_vulnerabilidade_vulnerabilidade!: Sequelize.BelongsToCreateAssociationMixin<vulnerabilidade>;

  static initModel(sequelize: Sequelize.Sequelize): typeof identificacao_usuario {

    const model = identificacao_usuario.init({
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      id_endereco: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'endereco',
          key: 'id'
        },
        unique: "Identification_person_ibfk_1"
      },
      id_situacao_financeira: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'situacao_financeira',
          key: 'id'
        },
        unique: "Identification_person_ibfk_5"
      },
      id_vulnerabilidade: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'vulnerabilidade',
          key: 'id'
        },
        unique: "Identification_person_ibfk_3"
      },
      nome: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      apelido: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      pasta: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      arquivo: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      nº: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      data_nascimento: {
        type: DataTypes.DATEONLY,
        allowNull: true
      },
      certidao_nascimento: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      NIS: {
        type: DataTypes.BIGINT,
        allowNull: true
      },
      numero_rg: {
        type: DataTypes.STRING(11),
        allowNull: true
      },
      data_emissao_rg: {
        type: DataTypes.DATEONLY,
        allowNull: true
      },
      uf_rg: {
        type: DataTypes.STRING(2),
        allowNull: true
      },
      emissao_rg: {
        type: DataTypes.STRING(11),
        allowNull: true
      },
      cpf: {
        type: DataTypes.STRING(11),
        allowNull: false
      },
      deficiente: {
        type: DataTypes.STRING(3),
        allowNull: false
      },
      deficiencia: {
        type: DataTypes.STRING(255),
        allowNull: true
      },
      mae: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      pai: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      estado_civil: {
        type: DataTypes.STRING(20),
        allowNull: false
      },
      escolaridade: {
        type: DataTypes.STRING(20),
        allowNull: false
      },
      data_inicial: {
        type: DataTypes.DATEONLY,
        allowNull: false
      },
      data_final: {
        type: DataTypes.DATEONLY,
        allowNull: true
      }
    }, {
      sequelize,
      tableName: 'identificacao_usuario',
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
          name: "id_address",
          unique: true,
          using: "BTREE",
          fields: [
            { name: "id_endereco" },
          ]
        },
        {
          name: "id_situationFinancial",
          unique: true,
          using: "BTREE",
          fields: [
            { name: "id_situacao_financeira" },
          ]
        },
        {
          name: "id_Vulnerabilities",
          unique: true,
          using: "BTREE",
          fields: [
            { name: "id_vulnerabilidade" },
          ]
        },
      ]
    });

   

    return model;
  }

}
