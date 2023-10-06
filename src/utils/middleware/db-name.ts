import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class DbNameMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: Function) {
    if (req.query['dbName']) {
      req['dbName'] = req.query['dbName'];
    } else {
      req['dbName'] = 'cras-db';
    }

    try {
      if (req.user.dbName !== req['dbName']) {
        throw new HttpException('USER NOT ALLOWED!', HttpStatus.UNAUTHORIZED);
      }
    } catch (error) {}

    next();
  }
}
