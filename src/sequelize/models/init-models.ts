import type { Sequelize } from "@sequelize/core";
import { address as _address } from "./address";
import type { addressAttributes, addressCreationAttributes } from "./address";
import { attendance as _attendance } from "./attendance";
import type { attendanceAttributes, attendanceCreationAttributes } from "./attendance";
import { benefits as _benefits } from "./benefits";
import type { benefitsAttributes, benefitsCreationAttributes } from "./benefits";
import { edcenso_city as _edcenso_city } from "./edcenso_city";
import type { edcenso_cityAttributes, edcenso_cityCreationAttributes } from "./edcenso_city";
import { edcenso_uf as _edcenso_uf } from "./edcenso_uf";
import type { edcenso_ufAttributes, edcenso_ufCreationAttributes } from "./edcenso_uf";
import { family as _family } from "./family";
import type { familyAttributes, familyCreationAttributes } from "./family";
import { task as _task } from "./task";
import type { taskAttributes, taskCreationAttributes } from "./task";
import { technician as _technician } from "./technician";
import type { technicianAttributes, technicianCreationAttributes } from "./technician";
import { user as _user } from "./user";
import type { userAttributes, userCreationAttributes } from "./user";
import { user_identify as _user_identify } from "./user_identify";
import type { user_identifyAttributes, user_identifyCreationAttributes } from "./user_identify";
import { vulnerability as _vulnerability } from "./vulnerability";
import type { vulnerabilityAttributes, vulnerabilityCreationAttributes } from "./vulnerability";

export {
  _address as address,
  _attendance as attendance,
  _benefits as benefits,
  _edcenso_city as edcenso_city,
  _edcenso_uf as edcenso_uf,
  _family as family,
  _task as task,
  _technician as technician,
  _user as user,
  _user_identify as user_identify,
  _vulnerability as vulnerability,
};

export type {
  addressAttributes,
  addressCreationAttributes,
  attendanceAttributes,
  attendanceCreationAttributes,
  benefitsAttributes,
  benefitsCreationAttributes,
  edcenso_cityAttributes,
  edcenso_cityCreationAttributes,
  edcenso_ufAttributes,
  edcenso_ufCreationAttributes,
  familyAttributes,
  familyCreationAttributes,
  taskAttributes,
  taskCreationAttributes,
  technicianAttributes,
  technicianCreationAttributes,
  userAttributes,
  userCreationAttributes,
  user_identifyAttributes,
  user_identifyCreationAttributes,
  vulnerabilityAttributes,
  vulnerabilityCreationAttributes,
};

export function initModels(sequelize: Sequelize) {
  const address = _address.initModel(sequelize);
  const attendance = _attendance.initModel(sequelize);
  const benefits = _benefits.initModel(sequelize);
  const edcenso_city = _edcenso_city.initModel(sequelize);
  const edcenso_uf = _edcenso_uf.initModel(sequelize);
  const family = _family.initModel(sequelize);
  const task = _task.initModel(sequelize);
  const technician = _technician.initModel(sequelize);
  const user = _user.initModel(sequelize);
  const user_identify = _user_identify.initModel(sequelize);
  const vulnerability = _vulnerability.initModel(sequelize);

  family.belongsTo(address, { as: "address_fk_address", foreignKey: "address_fk"});
  address.hasMany(family, { as: "families", foreignKey: "address_fk"});
  family.belongsTo(benefits, { as: "benefit_fk_benefit", foreignKey: "benefit_fk"});
  benefits.hasMany(family, { as: "families", foreignKey: "benefit_fk"});
  address.belongsTo(edcenso_city, { as: "edcenso_city_fk_edcenso_city", foreignKey: "edcenso_city_fk"});
  edcenso_city.hasMany(address, { as: "addresses", foreignKey: "edcenso_city_fk"});
  address.belongsTo(edcenso_uf, { as: "edcenso_uf_fk_edcenso_uf", foreignKey: "edcenso_uf_fk"});
  edcenso_uf.hasMany(address, { as: "addresses", foreignKey: "edcenso_uf_fk"});
  edcenso_city.belongsTo(edcenso_uf, { as: "edcenso_uf_fk_edcenso_uf", foreignKey: "edcenso_uf_fk"});
  edcenso_uf.hasMany(edcenso_city, { as: "edcenso_cities", foreignKey: "edcenso_uf_fk"});
  user_identify.belongsTo(family, { as: "family_fk_family", foreignKey: "family_fk"});
  family.hasMany(user_identify, { as: "user_identifies", foreignKey: "family_fk"});
  attendance.belongsTo(task, { as: "task_fk_task", foreignKey: "task_fk"});
  task.hasOne(attendance, { as: "attendance", foreignKey: "task_fk"});
  attendance.belongsTo(technician, { as: "technician_fk_technician", foreignKey: "technician_fk"});
  technician.hasMany(attendance, { as: "attendances", foreignKey: "technician_fk"});
  technician.belongsTo(user, { as: "user_fk_user", foreignKey: "user_fk"});
  user.hasOne(technician, { as: "technician", foreignKey: "user_fk"});
  attendance.belongsTo(user_identify, { as: "user_identify_fk_user_identify", foreignKey: "user_identify_fk"});
  user_identify.hasMany(attendance, { as: "attendances", foreignKey: "user_identify_fk"});
  user_identify.belongsTo(vulnerability, { as: "vulnerability_fk_vulnerability", foreignKey: "vulnerability_fk"});
  vulnerability.hasMany(user_identify, { as: "user_identifies", foreignKey: "vulnerability_fk"});

  return {
    address: address,
    attendance: attendance,
    benefits: benefits,
    edcenso_city: edcenso_city,
    edcenso_uf: edcenso_uf,
    family: family,
    task: task,
    technician: technician,
    user: user,
    user_identify: user_identify,
    vulnerability: vulnerability,
  };
}
