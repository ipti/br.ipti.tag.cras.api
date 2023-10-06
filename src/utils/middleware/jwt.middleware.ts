import { HttpException, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { JwtPayload } from '../jwt.interface';
import 'dotenv/config';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(' ')[1];

    if (token) {
      try {
        const decodedToken = jwt.verify(
          token,
          process.env.SECRET,
        ) as JwtPayload;

        req.user = decodedToken;
      } catch (error) {
        throw new HttpException(error, 401);
      }
    }
    next();
  }
}
