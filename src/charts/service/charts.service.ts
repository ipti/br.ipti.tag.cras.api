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

      return qnt_attendance;

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
      FROM \`cras-db\`.attendance a

      UNION

      SELECT "Atendimentos Pendentes" as name, 
      SUM(CASE WHEN a.\`result\` = "pendente" THEN 1 ELSE 0 END) as value, 
      COUNT(*) as total
      FROM \`cras-db\`.attendance a
      `);

    return qnt_attendance_finished_and_not_finished;
  }

  async attendanceByMonth() {
    const connection: Sequelize = DbConnection.getInstance().getConnection();

    const qnt_attendance_by_month = await connection.query(`
      SELECT MONTHNAME(a.\`date\`) as name,
      COUNT(*) as value
      FROM \`cras-db\`.attendance a
      GROUP BY MONTHNAME(a.\`date\`)
      ORDER BY MONTH(a.\`date\`)
      `);

    return qnt_attendance_by_month;
  }
}
