import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import { user as User } from '../../sequelize/models/user';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class UserService {
  async create(
    request: Request,
    createUser: CreateUserDto,
  ): Promise<User> {
    const dbName = request['dbName'];

    const userRegistered = await User.withSchema(dbName).findAll({
      where: { username: createUser.username },
    });

    if (userRegistered.length > 0) {
      throw new HttpException(
        'Username already exists',
        HttpStatus.BAD_REQUEST,
      );
    }
    const cryptoPassword = this.encryptedMd5Password(createUser.password);

    const createdUser = await User.withSchema(dbName).create({
      ...createUser,
      password: cryptoPassword,
    });

    return createdUser;
  }

  async findAll(request: Request): Promise<User[]> {
    const dbName = request['dbName'];

    const allUser = await User.withSchema(dbName).findAll();

    return allUser;
  }

  async findOne(request: Request, id: string): Promise<User> {
    const dbName = request['dbName'];

    const user = await User.withSchema(dbName).findByPk(+id);

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return user;
  }

  async update(
    request: Request,
    id: string,
    UpdateUserDto: UpdateUserDto,
  ) {
    const dbName = request['dbName'];

    await this.findOne(request, id);

    const userUpdated = await User.withSchema(dbName).update(
      {
        ...UpdateUserDto,
      },
      {
        where: { id: +id },
      },
    );

    return userUpdated;
  }

  async remove(request: Request, id: string) {
    await this.findOne(request, id);

    const dbName = request['dbName'];

    const userDeleted = await User.withSchema(dbName).destroy({
      where: { id: +id },
    });

    return userDeleted;
  }

  private encryptedMd5Password(password: string) {
    return crypto.createHash('md5').update(password).digest('hex');
  }
}
