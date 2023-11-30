import { HttpException, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateFOUIForwardingDto } from '../dto/create-FOUIforwarding.dto';
import { optionalKeyValidation } from 'src/utils/optionalKeysValidation';

@Injectable()
export class FOUIForwardingBffService {
  constructor(private readonly prismaService: PrismaService) {}

  async createForwarding(forwardingCreate: CreateFOUIForwardingDto) {
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

    const forwarding =
      await this.prismaService.family_or_user_forwarding.create({
        data: {
          description: forwardingCreate.description,
          date: forwardingCreate.date,
          family: familyOptional,
          user_identify: user_identifyOptional,
          forwading: forwardingOptional,
        },
      });

    return forwarding;
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

    const forwadings =
      await this.prismaService.family_or_user_forwarding.findMany({
        where: {
          family: {
            id: +familyId,
          },
        },
        include: {
          forwading: true,
        },
      });

    return { familyInformation, forwadings };
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
