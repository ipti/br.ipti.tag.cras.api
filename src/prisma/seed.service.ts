import { Injectable, OnModuleInit } from '@nestjs/common';
import { Benefits, PrismaClient } from '@prisma/client';

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

      return tx.benefits.createMany({
        data: benefitsToCreateFiltered,
      });
    });
  }
}
