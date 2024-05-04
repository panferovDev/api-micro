import { Controller, Get, HttpException, Param } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import {
  CurrencyGetAll,
  CorrencyGetOne,
  ExchangeRateGetOne,
  ExchangeRateGetAll
} from '@elbrus-api/contracts';

@Controller()
export class RateController {
  constructor(@Inject('RATE_SERVICE') private client: ClientProxy) {}
  @Get('currencies')
  async getData() {
    try {
      const response = await firstValueFrom(
        this.client.send<CurrencyGetAll.Response['data']>(
          CurrencyGetAll.pattern,
          {}
        )
      );
      return response;
    } catch (e) {
      console.error(e);
      throw new HttpException('Сервис временно недоступен', 503);
    }
  }

  @Get('currencies/:id')
  async getOne(@Param() params: CorrencyGetOne.Params) {
    try {
      const response = await firstValueFrom(
        this.client.send<
          CorrencyGetOne.Response['data'],
          CorrencyGetOne.Params['id']
        >(CorrencyGetOne.pattern, params.id)
      );
      return response;
    } catch (e) {
      console.error(e);
      throw new HttpException('Сервис временно недоступен', 503);
    }
  }

  @Get('exchangerates')
  async getExchangeRates(): Promise<ExchangeRateGetAll.Response['data']> {
    try {
      const response = await firstValueFrom(
        this.client.send<ExchangeRateGetAll.Response['data']>(ExchangeRateGetAll.pattern, {})
      );
      return response;
    } catch (e) {
      console.error(e);
      throw new HttpException('Сервис временно недоступен', 503);
    }
  }

  @Get('exchangerate/:from/:to')
  async getExchangeRate(@Param() params: ExchangeRateGetOne.Request) {
    try {
      const response = await firstValueFrom(
        this.client.send<
          ExchangeRateGetOne.Response,
          ExchangeRateGetOne.Request
        >(ExchangeRateGetOne.pattern, params)
      );

      return response;
    } catch (e) {
      console.error(e);
      throw new HttpException('Сервис временно недоступен', 503);
    }
  }
}
