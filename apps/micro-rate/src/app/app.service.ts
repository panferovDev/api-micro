import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getRates(): { message: string } {
    return { message: 'Hello API' };
  }
}
