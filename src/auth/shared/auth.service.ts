import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { user } from '../../sequelize/models/user';
import * as crypto from 'crypto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
  ) {}

  async validateUser(request, userUsername: string, userPassword: string) {

    const dbName = request['dbName'];

    const userFound = await user.withSchema(dbName).findOne({
      where: {
        username: userUsername,
      }
    });

    if(!userFound){
      throw new HttpException(
        'USER OR PASSWORD IS INCORRECT!',
        HttpStatus.UNAUTHORIZED,
      );
    };

    if (
      userFound.dataValues && this.validateMd5Password(userPassword, userFound.dataValues.password)
    ) {
      const { name, username, id, role } = userFound.dataValues;

      return { name, username, id, role, dbName: dbName };
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.id, role: user.role, dbName: user.dbName };
    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }

  private validateMd5Password(password: string, encryptedPassword: string) {
    const currentEncryptedPassword = this.encryptedMd5Password(password);
    if (currentEncryptedPassword === encryptedPassword) {
      return true;
    }
    return false;
  }

  private encryptedMd5Password(password: string) {
    return crypto.createHash('md5').update(password).digest('hex');
  }
}
