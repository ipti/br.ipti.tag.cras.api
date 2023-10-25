import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Sequelize } from '@sequelize/core';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ChartsService {
  constructor(private readonly prismaService: PrismaService) {}

  async countAttendance() {
    try {
      const qnt_attendance = await this.prismaService.$queryRaw`
      SELECT COUNT(id) FROM attendance a 
      `;

      return qnt_attendance;
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async attendanceFinishedOrPending() {
    const qnt_attendance_finished_and_not_finished = await this.prismaService
      .$queryRaw`
      SELECT "Atendimentos Finalizados" as name, 
      SUM(CASE WHEN a.result = "finalizado" THEN 1 ELSE 0 END) as value, 
      COUNT(*) as total
      FROM attendance a

      UNION

      SELECT "Atendimentos Pendentes" as name, 
      SUM(CASE WHEN a.result = "pendente" THEN 1 ELSE 0 END) as value, 
      COUNT(*) as total
      FROM attendance a
      `;

    return qnt_attendance_finished_and_not_finished;
  }

  async attendanceByMonth() {
    const qnt_attendance_by_month = await this.prismaService.$queryRaw`
    SELECT MONTHNAME(a.date) as name,
    COUNT(*) as value
    FROM attendance a
    GROUP BY MONTHNAME(a.date)
    ORDER BY MONTH(a.date)
    `;

    return qnt_attendance_by_month;
  }

  async vulnerabilityRegistered() {
    const vulnerability_registered = await this.prismaService.$queryRaw`
    SELECT "Ocupação Irregular" as name, 
    SUM(CASE WHEN v.irregular_ocupation = 1 THEN 1 ELSE 0 END) as value, 
    COUNT(*) as total
    FROM vulnerability v 

    UNION

    SELECT "Criança Sozinha" as name, 
        SUM(CASE WHEN v.alone_child = 1 THEN 1 ELSE 0 END) as value, 
        COUNT(*) as total
    FROM vulnerability v

    UNION

    SELECT "Idosos Pendentes" as name, 
        SUM(CASE WHEN v.dependent_elderly = 1 THEN 1 ELSE 0 END) as value, 
        COUNT(*) as total
    FROM vulnerability v

    UNION

    SELECT "Desempregados" as name, 
        SUM(CASE WHEN v.unemployed = 1 THEN 1 ELSE 0 END) as value, 
        COUNT(*) as total
    FROM vulnerability v

    UNION

    SELECT "Deficientes" as name, 
        SUM(CASE WHEN v.deficient = 1 THEN 1 ELSE 0 END) as value, 
        COUNT(*) as total
    FROM vulnerability v

    UNION

    SELECT "Baixa Renda" as name, 
        SUM(CASE WHEN v.low_income = 1 THEN 1 ELSE 0 END) as value, 
        COUNT(*) as total
    FROM vulnerability v

    UNION

    SELECT "Outros" as name, 
        SUM(CASE WHEN v.\`others\` = 1 THEN 1 ELSE 0 END) as value, 
        COUNT(*) as total
    FROM vulnerability v
      `;

    return vulnerability_registered;
  }
}
