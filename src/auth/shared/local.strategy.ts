import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'username',
      passwordField: 'password',
      passReqToCallback: true,
    });
  }

  async validate(request: any): Promise<any> {

    const user = await this.authService.validateUser(request.body.username, request.body.password);
    if (!user) {
      throw new HttpException(
        'USER OR PASSWORD IS INCORRECT!',
        HttpStatus.UNAUTHORIZED,
      );
    }
    return user;
  }
}
