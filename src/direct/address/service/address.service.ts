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
    const { edcenso_city_fk, ...rest } = createAddress;

    const transactionResult = await this.prismaService.$transaction(
      async (tx) => {
        const city = edcenso_city_fk
          ? await tx.edcenso_city.findUnique({ where: { id: edcenso_city_fk } })
          : await tx.edcenso_city.findFirst();

        const createdAddress = await tx.address.create({
          data: {
            ...rest,
            edcenso_city: city ? { connect: { id: city.id } } : undefined,
            edcenso_uf: city ? { connect: { id: city.edcenso_uf_fk } } : undefined,
          },
        });

        return createdAddress;
      },
    );

    return transactionResult;
  }

  async findAll(request: Request): Promise<address[]> {
    const allAddress = await this.prismaService.address.findMany();

    return allAddress;
  }

  async findOne(request: Request, id: string): Promise<address> {
    const address = await this.prismaService.address.findUnique({
      where: { id: +id },
    });

    if (!address) {
      throw new HttpException('Address not found', HttpStatus.NOT_FOUND);
    }

    return address;
  }

  async update(
    request: Request,
    id: string,
    updateAddressDto: UpdateAddressDto,
  ): Promise<address> {
    await this.findOne(request, id);

    const { edcenso_city_fk, ...rest } = updateAddressDto;

    let cityData: { edcenso_city_fk?: number; edcenso_uf_fk?: number } = {};

    if (edcenso_city_fk) {
      const city = await this.prismaService.edcenso_city.findUnique({
        where: { id: edcenso_city_fk },
      });

      if (!city) {
        throw new HttpException('Cidade não encontrada', HttpStatus.NOT_FOUND);
      }

      cityData = { edcenso_city_fk: city.id, edcenso_uf_fk: city.edcenso_uf_fk };
    }

    const addressUpdated = await this.prismaService.address.update({
      data: { ...rest, ...cityData } as any,
      where: { id: +id },
    });

    return addressUpdated;
  }

  async remove(request: Request, id: string): Promise<address> {
    await this.findOne(request, id);

    const addressDeleted = await this.prismaService.address.delete({
      where: { id: +id },
    });

    return addressDeleted;
  }
}
