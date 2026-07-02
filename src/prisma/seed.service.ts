import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Benefits, ForwadingType, PrismaClient, Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import * as fs from 'fs';
import * as path from 'path';

const prisma = new PrismaClient();

@Injectable()
export class SeedService implements OnModuleInit {
  private readonly logger = new Logger(SeedService.name);

  async onModuleInit() {
    await this.seedAdminUser();
    await this.seedFromSqlDump();
    const seed = await prisma.$transaction(async (tx) => {
      const benefits = await tx.benefits.findMany();

      const benefitsToCreate = [
        {
          description: 'Bolsa Familia',
          type: Benefits.PERIODICO,
          canDelete: false,
        },
        {
          description: 'BPC',
          type: Benefits.PERIODICO,
          canDelete: false,
        },
        {
          description: 'PETI',
          type: Benefits.PERIODICO,
          canDelete: false,
        },
        {
          description: 'Auxilio-Natalidade',
          type: Benefits.EVENTUAL,
          canDelete: false,
        },
        {
          description: 'Auxilio-Funeral',
          type: Benefits.EVENTUAL,
          canDelete: false,
        },
      ];

      const benefitsToCreateFiltered = benefitsToCreate.filter(
        (benefitToCreate) => {
          return !benefits.some(
            (benefit) => benefit.description === benefitToCreate.description,
          );
        },
      );

      await tx.benefits.createMany({
        data: benefitsToCreateFiltered,
      });

      const tasks = await tx.task.findMany();

      const tasksToCreate = [
        {
          name: 'Serviço de Convivência e Fortalecimento de Vínculos',
          description: `É um serviço realizado em grupos,
          organizado a partir de percursos, de modo a garantir aquisições progressivas a seus usuários,
          de acordo com seu ciclo de vida, a fim de complementar o trabalho social com famílias e prevenir
          a ocorrência de situações de risco social.`,
          canDelete: false,
          isCollective: true,
        },
        {
          name: 'Grupo desenvolvido pelo PAIF',
          canDelete: false,
          isCollective: true,
        },
        {
          name: 'Palestras, oficinas e outras atividades coletivas de caráter não continuado',
          canDelete: false,
          isCollective: true,
        },
        {
          name: 'Encaminhamentos',
          canDelete: false,
          isCollective: false,
        }
      ];

      const tasksToCreateFiltered = tasksToCreate.filter((taskToCreate) => {
        return !tasks.some((task) => task.name === taskToCreate.name);
      });

      await tx.task.createMany({
        data: tasksToCreateFiltered,
      });

      const forwadings = await tx.forwading.findMany({
        where: {
          canDelete: false,
        },
      });

      const forwardingsToCreate = [
        {
          name: 'CRAS',
          canDelete: false,
          type: ForwadingType.ENCAMINHAMENTO,
        },
        {
          name: 'CREAS',
          canDelete: false,
          type: ForwadingType.ENCAMINHAMENTO,
        },
        {
          name: 'BPC',
          canDelete: false,
          type: ForwadingType.ACESSO,
        },
        {
          name: 'PAIF',
          canDelete: false,
          type: ForwadingType.ACOMPANHAMENTO,
        },
        {
          name: 'PAEFI',
          canDelete: false,
          type: ForwadingType.ACOMPANHAMENTO,
        },
        {
          name: 'CadUnico',
          canDelete: false,
          type: ForwadingType.INCLUSAO,
        },
        {
          name: 'CadUnico',
          canDelete: false,
          type: ForwadingType.ATUALIZACAO,
        },
      ];

      const forwardingsToCreateFiltered = forwardingsToCreate.filter(
        (forwardingToCreate) => {
          return !forwadings.some(
            (forwarding) => forwarding.name === forwardingToCreate.name,
          );
        },
      );

      await tx.forwading.createMany({
        data: forwardingsToCreateFiltered,
      });
    });
  }

  private async seedFromSqlDump() {
    const ufCount = await prisma.edcenso_uf.count();
    const cityCount = await prisma.edcenso_city.count();
    if (ufCount > 0 && cityCount > 0) return;

    const sqlPath = path.join(process.cwd(), 'db', 'dump-city-state.sql');
    const sql = fs.readFileSync(sqlPath, 'utf-8');

    if (ufCount === 0) {
      const match = sql.match(/INSERT INTO `state` VALUES (.+);/);
      if (match) {
        await prisma.$executeRawUnsafe(
          `INSERT IGNORE INTO \`edcenso_uf\` (id, acronym, name) VALUES ${match[1]}`,
        );
        this.logger.log('27 estados (UF) inseridos.');
      }
    }

    if (cityCount === 0) {
      const match = sql.match(/INSERT INTO `city` VALUES (.+);/);
      if (match) {
        await prisma.$executeRawUnsafe(
          `INSERT IGNORE INTO \`edcenso_city\` (id, edcenso_uf_fk, name, cep_initial, cep_final, ddd1, ddd2) VALUES ${match[1]}`,
        );
        this.logger.log('Municípios inseridos.');
      }
    }
  }

  private async seedAdminUser() {
    const existing = await prisma.user.findUnique({
      where: { username: 'admin' },
    });

    if (existing) return;

    const password = await bcrypt.hash('admin@cras', 12);

    await prisma.user.create({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      data: {
        name: 'Administrador',
        username: 'admin',
        email: 'admin@cras.gov.br',
        password,
        role: Role.ADMIN,
      } as any,
    });

    this.logger.log(
      'Usuário admin criado. Login: admin | Senha: admin@cras',
    );
  }
}
