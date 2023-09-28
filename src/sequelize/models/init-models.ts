import type { Sequelize } from "@sequelize/core";
import { address as _address } from "./address";
import type { addressAttributes, addressCreationAttributes } from "./address";
import { attendance as _attendance } from "./attendance";
import type { attendanceAttributes, attendanceCreationAttributes } from "./attendance";
import { benefits as _benefits } from "./benefits";
import type { benefitsAttributes, benefitsCreationAttributes } from "./benefits";
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
  const family = _family.initModel(sequelize);
  const task = _task.initModel(sequelize);
  const technician = _technician.initModel(sequelize);
  const user = _user.initModel(sequelize);
  const user_identify = _user_identify.initModel(sequelize);
  const vulnerability = _vulnerability.initModel(sequelize);

  family.belongsTo(address, { as: "address_fk_address", foreignKey: "address_fk"});
  address.hasMany(family, { as: "families", foreignKey: "address_fk"});
  task.belongsTo(attendance, { as: "attendance_fk_attendance", foreignKey: "attendance_fk"});
  attendance.hasMany(task, { as: "tasks", foreignKey: "attendance_fk"});
  family.belongsTo(benefits, { as: "benefit_fk_benefit", foreignKey: "benefit_fk"});
  benefits.hasMany(family, { as: "families", foreignKey: "benefit_fk"});
  user_identify.belongsTo(family, { as: "family_fk_family", foreignKey: "family_fk"});
  family.hasMany(user_identify, { as: "user_identifies", foreignKey: "family_fk"});
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
    family: family,
    task: task,
    technician: technician,
    user: user,
    user_identify: user_identify,
    vulnerability: vulnerability,
  };
}
