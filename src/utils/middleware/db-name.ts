import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class DbNameMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: Function) {
    const match = req.hostname.match(/api-(\w+)\.tag\.ong\.br/);

    if (match) {
      req['dbName'] = match[1];
    } else if (req.query['dbName']) {
      req['dbName'] = req.query['dbName'];
    } else {
      req['dbName'] = 'crasDb';
    }
    
    next();
  }
}