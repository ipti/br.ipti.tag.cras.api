import { HttpException, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateFOUIForwardingDto } from '../dto/create-FOUIforwarding.dto';
import { optionalKeyValidation } from 'src/utils/optionalKeysValidation';
import { JwtPayload } from 'src/utils/jwt.interface';
import { Result } from '@prisma/client';

@Injectable()
export class FOUIForwardingBffService {
  constructor(private readonly prismaService: PrismaService) {}

  async createForwarding(
    user: JwtPayload,
    forwardingCreate: CreateFOUIForwardingDto,
  ) {
    if (
      forwardingCreate.family === undefined &&
      forwardingCreate.user_identify === undefined
    ) {
      throw new HttpException('Family or user_identify must be informed', 400);
    }

    if (
      forwardingCreate.family !== undefined &&
      forwardingCreate.user_identify !== undefined
    ) {
      throw new HttpException(
        'Family or user_identify must be informed, not both',
        400,
      );
    }

    const familyOptional = optionalKeyValidation(forwardingCreate.family, {
      connect: {
        id: forwardingCreate.family,
      },
    });

    const user_identifyOptional = optionalKeyValidation(
      forwardingCreate.user_identify,
      {
        connect: {
          id: forwardingCreate.user_identify,
        },
      },
    );

    const forwardingOptional = optionalKeyValidation(
      forwardingCreate.forwading,
      {
        connect: {
          id: forwardingCreate.forwading,
        },
      },
    );

    const transactionResult = await this.prismaService.$transaction(
      async (tx) => {
        const forwarding = await tx.family_or_user_forwarding.create({
          data: {
            description: forwardingCreate.description,
            date: forwardingCreate.date,
            family: familyOptional,
            user_identify: user_identifyOptional,
            forwading: forwardingOptional,
          },
        });

        const technician = await tx.technician.findUnique({
          where: {
            user_fk: user.id,
          },
        });

        if (!technician) {
          throw new HttpException('Technician not found', 404);
        }

        const task = await tx.task.findFirst({
          where: {
            name: 'Encaminhamentos',
            canDelete: false,
            isCollective: false,
          },
        });

        if (!task) {
          throw new HttpException('Task not found', 404);
        }

        const attendance = await tx.attendance.create({
          data: {
            edcenso_city: {
              connect: {
                id: user.edcenso_city_fk,
              },
            },
            user_identify: user_identifyOptional,
            technician: {
              connect: {
                id: technician.id,
              },
            },
            task: {
              connect: {
                id: task.id,
              },
            },
            attendance_unity: {
              connect: {
                id: technician.attendance_unity_fk,
              },
            },
            forwading: {
              connect: {
                id: forwarding.id,
              },
            },
            solicitation: 'Encaminhamento',
            providence: 'Encaminhamento',
            result: Result.PENDENTE,
            description: forwardingCreate.description
              ? forwardingCreate.description
              : 'Encaminhamento',
            date: forwardingCreate.date,
          },
        });

        return { forwarding, attendance };
      },
    );

    return transactionResult;
  }

  async getFamilyForwarding(request: Request, familyId: string) {
    const familyInformation = await this.prismaService.family.findUnique({
      where: {
        id: +familyId,
      },
      include: {
        user_identify: {
          select: {
            id: true,
            name: true,
            kinship: true,
          },
        },
      },
    });

    if (!familyInformation) {
      throw new HttpException('Family not found', 404);
    }

    const familyForwadings =
      await this.prismaService.family_or_user_forwarding.findMany({
        where: {
          family: {
            id: +familyId,
          },
        },
        select: {
          forwading: true,
        },
      });

    const usersForwarding =
      await this.prismaService.family_or_user_forwarding.findMany({
        where: {
          user_identify_fk: {
            in: familyInformation.user_identify.map((user) => user.id),
          },
        },
        include: {
          forwading: true,
          user_identify: {
            select: {
              id: true,
              name: true,
              kinship: true,
            },
          },
        },
      });

    return { familyInformation, familyForwadings, usersForwarding };
  }

  async getUserIdentifyForwarding(request: Request, userIdentifyId: string) {
    const userInformation = await this.prismaService.user_identify.findUnique({
      where: {
        id: +userIdentifyId,
      },
      select: {
        id: true,
        name: true,
      },
    });

    if (!userInformation) {
      throw new HttpException('User not found', 404);
    }

    const forwadings =
      await this.prismaService.family_or_user_forwarding.findMany({
        where: {
          user_identify: {
            id: +userIdentifyId,
          },
        },
        include: {
          forwading: true,
        },
      });

    return { userInformation, forwadings };
  }
}
