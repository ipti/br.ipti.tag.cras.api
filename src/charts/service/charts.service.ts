import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Sequelize } from '@sequelize/core';
import { Request } from 'express';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ChartsService {
  constructor(private readonly prismaService: PrismaService) {}

  async countAttendance(request: Request) {
    try {
      const result = await this.prismaService.$queryRaw`
        SELECT COUNT(id) as count FROM attendance a 
        WHERE a.edcenso_city_fk = ${request.user.edcenso_city_fk}
      `;

      const qnt_attendance = Number(result[0].count);

      return qnt_attendance;
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async attendanceFinishedOrPending(request: Request) {
    const result = await this.prismaService.$queryRaw`
      SELECT "Atendimentos Finalizados" as name, 
      SUM(CASE WHEN a.result = "FINALIZADO" THEN 1 ELSE 0 END) as value, 
      COUNT(*) as total
      FROM attendance a
      WHERE a.edcenso_city_fk = ${request.user.edcenso_city_fk}

      UNION

      SELECT "Atendimentos Pendentes" as name, 
      SUM(CASE WHEN a.result = "PENDENTE" THEN 1 ELSE 0 END) as value, 
      COUNT(*) as total
      FROM attendance a
      WHERE a.edcenso_city_fk = ${request.user.edcenso_city_fk}
      `;

    const qnt_attendance_finished_and_not_finished = {
      finished: Number(result[0].value),
      pending: Number(result[1].value),
      total: Number(result[0].total) + Number(result[1].total),
    };

    return qnt_attendance_finished_and_not_finished;
  }

  async attendanceByMonth(request: Request) {
    const qnt_attendance_by_month = await this.prismaService.$queryRaw`
    SELECT MONTHNAME(a.date) as name,
    COUNT(*) as value
    FROM attendance a
    WHERE a.edcenso_city_fk = ${request.user.edcenso_city_fk}
    GROUP BY MONTHNAME(a.date)
    ORDER BY MONTH(a.date)
    `;

    return qnt_attendance_by_month;
  }

  async vulnerabilityRegistered(request: Request) {
    const result = await this.prismaService.$queryRaw`
    SELECT "Ocupação Irregular" as name, 
    SUM(CASE WHEN v.irregular_ocupation = 1 THEN 1 ELSE 0 END) as value, 
    COUNT(*) as total
    FROM vulnerability v
    WHERE v.edcenso_city_fk = ${request.user.edcenso_city_fk}

    UNION

    SELECT "Criança Sozinha" as name, 
        SUM(CASE WHEN v.alone_child = 1 THEN 1 ELSE 0 END) as value, 
        COUNT(*) as total
    FROM vulnerability v
    WHERE v.edcenso_city_fk = ${request.user.edcenso_city_fk}

    UNION

    SELECT "Idosos Pendentes" as name, 
        SUM(CASE WHEN v.dependent_elderly = 1 THEN 1 ELSE 0 END) as value, 
        COUNT(*) as total
    FROM vulnerability v
    WHERE v.edcenso_city_fk = ${request.user.edcenso_city_fk}

    UNION

    SELECT "Desempregados" as name, 
        SUM(CASE WHEN v.unemployed = 1 THEN 1 ELSE 0 END) as value, 
        COUNT(*) as total
    FROM vulnerability v
    WHERE v.edcenso_city_fk = ${request.user.edcenso_city_fk}

    UNION

    SELECT "Deficientes" as name, 
        SUM(CASE WHEN v.deficient = 1 THEN 1 ELSE 0 END) as value, 
        COUNT(*) as total
    FROM vulnerability v
    WHERE v.edcenso_city_fk = ${request.user.edcenso_city_fk}

    UNION

    SELECT "Baixa Renda" as name, 
        SUM(CASE WHEN v.low_income = 1 THEN 1 ELSE 0 END) as value, 
        COUNT(*) as total
    FROM vulnerability v
    WHERE v.edcenso_city_fk = ${request.user.edcenso_city_fk}

    UNION

    SELECT "Outros" as name, 
        SUM(CASE WHEN v.\`others\` = 1 THEN 1 ELSE 0 END) as value, 
        COUNT(*) as total
    FROM vulnerability v
    WHERE v.edcenso_city_fk = ${request.user.edcenso_city_fk}
      `;

    const vulnerability_registered = {
      irregular_ocupation: Number(result[0].value),
      alone_child: Number(result[1].value),
      dependent_elderly: Number(result[2].value),
      unemployed: Number(result[3].value),
      deficient: Number(result[4].value),
      low_income: Number(result[5].value),
      others: Number(result[6].value),
      total:
        Number(result[0].value) +
        Number(result[1].value) +
        Number(result[2].value) +
        Number(result[3].value) +
        Number(result[4].value) +
        Number(result[5].value) +
        Number(result[6].value),
    };

    return vulnerability_registered;
  }
}
