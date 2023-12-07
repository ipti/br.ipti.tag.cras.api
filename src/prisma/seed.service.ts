import { Injectable, OnModuleInit } from '@nestjs/common';
import { Benefits, ForwadingType, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class SeedService implements OnModuleInit {
  async onModuleInit() {
    const seed = await prisma.$transaction(async (tx) => {
      const benefits = await tx.benefits.findMany({
        where: {
          edcenso_city_fk: null,
        },
      });

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

      const tasks = await tx.task.findMany({
        where: {
          edcenso_city_fk: null,
        },
      });

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
}
