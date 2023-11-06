import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.SECRET,
    });
  }

  async validate(payload: any) {
    return {
      id: payload.sub,
      username: payload.username,
      type: payload.type,
      role: payload.role,
      edcenso_city_fk: payload.edcenso_city_fk,
      attendance_unity_fk: payload.attendance_unity_fk,
    };
  }
}
