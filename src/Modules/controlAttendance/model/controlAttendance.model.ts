import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import { identificacao_usuario, identificacao_usuarioId } from '../../userIdentify/model/userIdentify.model';

export interface control_attendanceAttributes {
  id_identification_Person: number;
  date: string;
  id_service: number;
  solicitation: string;
  providence: string;
  result: string;
  technician_name: string;
}

export type control_attendancePk = "id_identification_Person";
export type control_attendanceId = control_attendance[control_attendancePk];
export type control_attendanceCreationAttributes = control_attendanceAttributes;

export class control_attendance extends Model<control_attendanceAttributes, control_attendanceCreationAttributes> implements control_attendanceAttributes {
  id_identification_Person!: number;
  date!: string;
  id_service!: number;
  solicitation!: string;
  providence!: string;
  result!: string;
  technician_name!: string;

  // control_attendance belongsTo identificacao_usuario via id_identification_Person
  id_identification_Person_identificacao_usuario!: identificacao_usuario;
  getId_identification_Person_identificacao_usuario!: Sequelize.BelongsToGetAssociationMixin<identificacao_usuario>;
  setId_identification_Person_identificacao_usuario!: Sequelize.BelongsToSetAssociationMixin<identificacao_usuario, identificacao_usuarioId>;
  createId_identification_Person_identificacao_usuario!: Sequelize.BelongsToCreateAssociationMixin<identificacao_usuario>;

  static initModel(sequelize: Sequelize.Sequelize): typeof control_attendance {
    return control_attendance.init({
    id_identification_Person: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'identificacao_usuario',
        key: 'id'
      }
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    id_service: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: "id_service"
    },
    solicitation: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    providence: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    result: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    technician_name: {
      type: DataTypes.STRING(250),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'control_attendance',
    timestamps: false,
    indexes: [
      {
        name: "id_identification_Person",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_identification_Person" },
        ]
      },
      {
        name: "id_service",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_service" },
        ]
      },
    ]
  });
  }
}
