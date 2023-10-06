import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { address as Address } from '../../sequelize/models/address';
import { CreateAddressDto } from '../dto/create-address.dto';
import { UpdateAddressDto } from '../dto/update-address.dto';

@Injectable()
export class AddressService {
  async create(
    request: Request,
    createAddress: CreateAddressDto,
  ): Promise<Address> {
    const dbName = request['dbName'];

    const createdAddress = await Address.withSchema(dbName).create({
      ...createAddress,
    });

    return createdAddress;
  }

  async findAll(request: Request): Promise<Address[]> {
    const dbName = request['dbName'];

    const allAddress = await Address.withSchema(dbName).findAll();

    return allAddress;
  }

  async findOne(request: Request, id: string): Promise<Address> {
    const dbName = request['dbName'];

    const address = await Address.withSchema(dbName).findByPk(+id);

    if (!address) {
      throw new HttpException('Address not found', HttpStatus.NOT_FOUND);
    }

    return address;
  }

  async update(
    request: Request,
    id: string,
    UpdateAddressDto: UpdateAddressDto,
  ) {
    const dbName = request['dbName'];

    await this.findOne(request, id);

    const addressUpdated = await Address.withSchema(dbName).update(
      {
        ...UpdateAddressDto,
      },
      {
        where: { id: +id },
      },
    );

    return addressUpdated;
  }

  async remove(request: Request, id: string) {
    await this.findOne(request, id);

    const dbName = request['dbName'];

    const addressDeleted = await Address.withSchema(dbName).destroy({
      where: { id: +id },
    });

    return addressDeleted;
  }
}
