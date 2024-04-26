import { Controller, Get } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom, lastValueFrom} from 'rxjs';

@Controller()
export class RateController {
  constructor(@Inject('RATE_SERVICE') private client: ClientProxy) {}
  @Get('rate')
  async getData() {
    const response = await firstValueFrom(this.client.send< {data:string}, string>('rates', 'Hello Rate!'));
      console.log(typeof response);
    return response.data;
  }
}
