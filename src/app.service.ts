import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
  getOrigins(): any {
    return ['http://localhost:3000', 'https://polite-bay-054ec2310.3.azurestaticapps.net', 'https://cras-lourdes.tag.ong.br'];
  }
}
