import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Sequelize } from '@sequelize/core';
import { Request } from 'express';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ChartsService {
  constructor(private readonly prismaService: PrismaService) {}

  async countAttendance(request: Request, year: number) {
    try {
      const result = await this.prismaService.$queryRaw`
        SELECT COUNT(id) as count FROM attendance a 
        WHERE a.edcenso_city_fk = ${request.user.edcenso_city_fk}
        AND YEAR(a.date) = ${year}
      `;

      const qnt_attendance = Number(result[0].count);

      return qnt_attendance;
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async countFamily(request: Request, attendance_unity_fk?: string) {
    if (
      request.user.attendance_unity_fk === null &&
      attendance_unity_fk === undefined
    ) {
      throw new HttpException('MISSING ATTENDANCE UNITY', HttpStatus.FORBIDDEN);
    }

    try {
      var result;

      if (attendance_unity_fk !== undefined) {
        const counter = await this.prismaService.$queryRaw`
        SELECT COUNT(id) as count FROM family f 
        WHERE f.attendance_unity_fk = ${attendance_unity_fk} AND f.isActive = true
      `;

        const qnt_family = Number(counter[0].count);

        result = qnt_family;
      } else {
        const counter = await this.prismaService.$queryRaw`
        SELECT COUNT(id) as count FROM family f 
        WHERE f.attendance_unity_fk = ${request.user.attendance_unity_fk} AND f.isActive = true
      `;

        const qnt_family = Number(counter[0].count);

        result = qnt_family;
      }

      return result;
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async countUniFamly(request: Request, attendance_unity_fk?: string) {
    if (
      request.user.attendance_unity_fk === null &&
      attendance_unity_fk === undefined
    ) {
      throw new HttpException('MISSING ATTENDANCE UNITY', HttpStatus.FORBIDDEN);
    }
    try {
      var result;

      if (attendance_unity_fk !== undefined) {
        const counter: Array<any> = await this.prismaService.$queryRaw`
        SELECT SUM(total_families) AS count
        FROM (
          SELECT COUNT(*) AS total_families
          FROM family
          INNER JOIN user_identify ON family.id = user_identify.family_fk
          WHERE family.attendance_unity_fk = ${attendance_unity_fk}
          GROUP BY family.id
          HAVING COUNT(*) = 1
        ) AS subquery;
      `;

        var qnt_uni_family = 0;

        if (counter.length > 0) {
          qnt_uni_family = Number(counter[0].count);
        }

        result = qnt_uni_family;
      } else {
        const counter: Array<any> = await this.prismaService.$queryRaw`
        SELECT SUM(total_families) AS count
        FROM (
          SELECT COUNT(*) AS total_families
          FROM family
          INNER JOIN user_identify ON family.id = user_identify.family_fk
          WHERE family.attendance_unity_fk = ${request.user.attendance_unity_fk}
          GROUP BY family.id
          HAVING COUNT(*) = 1
        ) AS subquery;
      `;

        var qnt_uni_family = 0;

        if (counter.length > 0) {
          qnt_uni_family = Number(counter[0].count);
        }

        result = qnt_uni_family;
      }

      return result;
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async attendanceFinishedOrPending(
    request: Request,
    year: number,
    attendance_unity_fk?: string,
  ) {
    var result;

    if (
      request.user.attendance_unity_fk === null &&
      attendance_unity_fk === undefined
    ) {
      throw new HttpException('MISSING ATTENDANCE UNITY', HttpStatus.FORBIDDEN);
    }

    if (attendance_unity_fk !== undefined) {
      const qnt_attendance_finished_and_not_finished = await this.prismaService
        .$queryRaw`
      SELECT "Atendimentos Finalizados" as name, 
      SUM(CASE WHEN a.result = "FINALIZADO" THEN 1 ELSE 0 END) as value, 
      COUNT(*) as total
      FROM attendance a
      WHERE a.attendance_unity_fk = ${attendance_unity_fk}
      AND YEAR(a.date) = ${year}

      UNION

      SELECT "Atendimentos Pendentes" as name, 
      SUM(CASE WHEN a.result = "PENDENTE" THEN 1 ELSE 0 END) as value, 
      COUNT(*) as total
      FROM attendance a
      WHERE a.attendance_unity_fk = ${attendance_unity_fk}
      AND YEAR(a.date) = ${year}
      `;

      result = {
        finished: Number(qnt_attendance_finished_and_not_finished[0].value),
        pending: Number(qnt_attendance_finished_and_not_finished[1].value),
        total:
          Number(qnt_attendance_finished_and_not_finished[0].value) +
          Number(qnt_attendance_finished_and_not_finished[1].value),
      };
    } else {
      const qnt_attendance_finished_and_not_finished = await this.prismaService
        .$queryRaw`
      SELECT "Atendimentos Finalizados" as name, 
      SUM(CASE WHEN a.result = "FINALIZADO" THEN 1 ELSE 0 END) as value, 
      COUNT(*) as total
      FROM attendance a
      WHERE a.attendance_unity_fk = ${request.user.attendance_unity_fk}
      AND YEAR(a.date) = ${year}

      UNION

      SELECT "Atendimentos Pendentes" as name, 
      SUM(CASE WHEN a.result = "PENDENTE" THEN 1 ELSE 0 END) as value, 
      COUNT(*) as total
      FROM attendance a
      WHERE a.attendance_unity_fk = ${request.user.attendance_unity_fk}
      AND YEAR(a.date) = ${year}
      `;

      result = {
        finished: Number(qnt_attendance_finished_and_not_finished[0].value),
        pending: Number(qnt_attendance_finished_and_not_finished[1].value),
        total:
          Number(qnt_attendance_finished_and_not_finished[0].value) +
          Number(qnt_attendance_finished_and_not_finished[1].value),
      };
    }

    return result;
  }

  async attendanceByMonth(
    request: Request,
    year: number,
    attendance_unity_fk?: string,
  ) {
    if (
      request.user.attendance_unity_fk === null &&
      attendance_unity_fk === undefined
    ) {
      throw new HttpException('MISSING ATTENDANCE UNITY', HttpStatus.FORBIDDEN);
    }

    var result;

    if (attendance_unity_fk !== undefined) {
      const qnt_attendance_by_month: Array<any> = await this.prismaService
        .$queryRaw`
      SELECT
        months.name as name,
        COALESCE(COUNT(a.date), 0) as value
      FROM (
        SELECT 1 as month, 'January' as name
        UNION SELECT 2, 'February'
        UNION SELECT 3, 'March'
        UNION SELECT 4, 'April'
        UNION SELECT 5, 'May'
        UNION SELECT 6, 'June'
        UNION SELECT 7, 'July'
        UNION SELECT 8, 'August'
        UNION SELECT 9, 'September'
        UNION SELECT 10, 'October'
        UNION SELECT 11, 'November'
        UNION SELECT 12, 'December'
      ) months
      LEFT JOIN attendance a ON MONTH(a.date) = months.month AND YEAR(a.date) = ${year} AND a.attendance_unity_fk = ${attendance_unity_fk}
      GROUP BY months.name
      ORDER BY months.month
    `;

      result = qnt_attendance_by_month.map((row) => ({
        name: row.name,
        value: Number(row.value),
      }));
    } else {
      const qnt_attendance_by_month: Array<any> = await this.prismaService
        .$queryRaw`
      SELECT
        months.name as name,
        COALESCE(COUNT(a.date), 0) as value
      FROM (
        SELECT 1 as month, 'January' as name
        UNION SELECT 2, 'February'
        UNION SELECT 3, 'March'
        UNION SELECT 4, 'April'
        UNION SELECT 5, 'May'
        UNION SELECT 6, 'June'
        UNION SELECT 7, 'July'
        UNION SELECT 8, 'August'
        UNION SELECT 9, 'September'
        UNION SELECT 10, 'October'
        UNION SELECT 11, 'November'
        UNION SELECT 12, 'December'
      ) months
      LEFT JOIN attendance a ON MONTH(a.date) = months.month AND YEAR(a.date) = ${year} AND a.attendance_unity_fk = ${request.user.attendance_unity_fk}
      GROUP BY months.name
      ORDER BY months.month
    `;

      result = qnt_attendance_by_month.map((row) => ({
        name: row.name,
        value: Number(row.value),
      }));
    }

    return result;
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
