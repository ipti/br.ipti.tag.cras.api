import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Sequelize } from '@sequelize/core';
import DbConnection from '../../sequelize/sequelize';

@Injectable()
export class ChartsService {
  async countAttendance() {
    try {
      const connection: Sequelize = DbConnection.getInstance().getConnection();

      const qnt_attendance = await connection.query(`
      SELECT COUNT(id) FROM attendance a 
      `);

      return qnt_attendance[0];

    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async attendanceFinishedOrPending() {

    const connection: Sequelize = DbConnection.getInstance().getConnection();

    const qnt_attendance_finished_and_not_finished = await connection.query(`
      SELECT "Atendimentos Finalizados" as name, 
      SUM(CASE WHEN a.\`result\` = "finalizado" THEN 1 ELSE 0 END) as value, 
      COUNT(*) as total
      FROM \`${connection.config.database}\`.attendance a

      UNION

      SELECT "Atendimentos Pendentes" as name, 
      SUM(CASE WHEN a.\`result\` = "pendente" THEN 1 ELSE 0 END) as value, 
      COUNT(*) as total
      FROM \`${connection.config.database}\`.attendance a
      `);

    return qnt_attendance_finished_and_not_finished[0];
  }

  async attendanceByMonth() {
    const connection: Sequelize = DbConnection.getInstance().getConnection();

    const qnt_attendance_by_month = await connection.query(`
      SELECT MONTHNAME(a.\`date\`) as name,
      COUNT(*) as value
      FROM \`${connection.config.database}\`.attendance a
      GROUP BY MONTHNAME(a.\`date\`)
      ORDER BY MONTH(a.\`date\`)
      `);

    return qnt_attendance_by_month[0];
  }

  async vulnerabilityRegistered() {
    const connection: Sequelize = DbConnection.getInstance().getConnection();

    const vulnerability_registered = await connection.query(`
    SELECT "Ocupação Irregular" as name, 
    SUM(CASE WHEN v.irregular_ocupation = 1 THEN 1 ELSE 0 END) as value, 
    COUNT(*) as total
    FROM \`${connection.config.database}\`.vulnerability v 

    UNION

    SELECT "Criança Sozinha" as name, 
        SUM(CASE WHEN v.alone_child = 1 THEN 1 ELSE 0 END) as value, 
        COUNT(*) as total
    FROM \`${connection.config.database}\`.vulnerability v

    UNION

    SELECT "Idosos Pendentes" as name, 
        SUM(CASE WHEN v.dependent_elderly = 1 THEN 1 ELSE 0 END) as value, 
        COUNT(*) as total
    FROM \`${connection.config.database}\`.vulnerability v

    UNION

    SELECT "Desempregados" as name, 
        SUM(CASE WHEN v.unemployed = 1 THEN 1 ELSE 0 END) as value, 
        COUNT(*) as total
    FROM \`${connection.config.database}\`.vulnerability v

    UNION

    SELECT "Deficientes" as name, 
        SUM(CASE WHEN v.deficient = 1 THEN 1 ELSE 0 END) as value, 
        COUNT(*) as total
    FROM \`${connection.config.database}\`.vulnerability v

    UNION

    SELECT "Baixa Renda" as name, 
        SUM(CASE WHEN v.low_income = 1 THEN 1 ELSE 0 END) as value, 
        COUNT(*) as total
    FROM \`${connection.config.database}\`.vulnerability v

    UNION

    SELECT "Outros" as name, 
        SUM(CASE WHEN v.\`others\` = 1 THEN 1 ELSE 0 END) as value, 
        COUNT(*) as total
    FROM \`${connection.config.database}\`.vulnerability v
      `);

    return vulnerability_registered[0];
  }
}
