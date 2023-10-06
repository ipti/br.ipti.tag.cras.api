import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { user } from 'src/sequelize/models/user';

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
        'USER NOT FOUND!',
        HttpStatus.NOT_FOUND,
      );
    };

    if (
      userFound.dataValues
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
}
