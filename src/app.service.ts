import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
  getOrigins(): any {
    return ['http://localhost:3000', 'https://cras.tag.ong.br', 'http://localhost:3001'];
  }
}
