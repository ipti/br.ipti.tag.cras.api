import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAddressDto } from '../dto/create-address.dto';
import { UpdateAddressDto } from '../dto/update-address.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { address } from '@prisma/client';
import { Request } from 'express';
import { optionalKeyValidation } from 'src/utils/optionalKeysValidation';

@Injectable()
export class AddressService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(
    request: Request,
    createAddress: CreateAddressDto,
  ): Promise<address> {
    const transactionResult = await this.prismaService.$transaction(
      async (tx) => {
        const edcenso_city = await tx.edcenso_city.findFirst({
          where: { id: request.user.edcenso_city_fk },
        });

        const createdAddress = await tx.address.create({
          data: {
            ...createAddress,
            edcenso_city: {
              connect: { id: edcenso_city.id },
            },
            edcenso_uf: {
              connect: { id: edcenso_city.edcenso_uf_fk },
            },
          },
        });

        return createdAddress;
      },
    );

    return transactionResult;
  }

  async findAll(request: Request): Promise<address[]> {
    const allAddress = await this.prismaService.address.findMany({
      where: { edcenso_city_fk: request.user.edcenso_city_fk },
    });

    return allAddress;
  }

  async findOne(request: Request, id: string): Promise<address> {
    const address = await this.prismaService.address.findUnique({
      where: { id: +id, edcenso_city_fk: request.user.edcenso_city_fk },
    });

    if (!address) {
      throw new HttpException('Address not found', HttpStatus.NOT_FOUND);
    }

    return address;
  }

  async update(
    request: Request,
    id: string,
    UpdateAddressDto: UpdateAddressDto,
  ): Promise<address> {
    await this.findOne(request, id);

    const edcenso_city = await this.prismaService.edcenso_city.findUnique({
      where: { id: request.user.edcenso_city_fk },
      select: { edcenso_uf_fk: true },
    });

    if(!edcenso_city) throw new HttpException('City not found', HttpStatus.NOT_FOUND);

    const ufOptional = optionalKeyValidation(edcenso_city.edcenso_uf_fk, {
      connect: {
        id: edcenso_city.edcenso_uf_fk,
      },
    });

    const cityOptional = optionalKeyValidation(request.user.edcenso_city_fk, {
      connect: {
        id: request.user.edcenso_city_fk,
      },
    });


    const addressUpdated = await this.prismaService.address.update({
      data: {
        ...UpdateAddressDto,
        edcenso_city: cityOptional,
        edcenso_uf: ufOptional,
      },
      where: { id: +id, edcenso_city_fk: request.user.edcenso_city_fk },
    });

    return addressUpdated;
  }

  async remove(request: Request, id: string): Promise<address> {
    await this.findOne(request, id);

    const addressDeleted = await this.prismaService.address.delete({
      where: { id: +id, edcenso_city_fk: request.user.edcenso_city_fk },
    });

    return addressDeleted;
  }
}
