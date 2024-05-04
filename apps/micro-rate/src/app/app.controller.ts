import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { PrismaService } from './prisma.service';
import {
  CurrencyGetAll,
  CorrencyGetOne,
  ExchangeRateGetOne,
  ExchangeRateGetAll,
} from '@elbrus-api/contracts';

@Controller()
export class AppController {
  constructor(private readonly prismaService: PrismaService) {}

  @MessagePattern(CurrencyGetAll.pattern)
  async getCurrancies(): Promise<CurrencyGetAll.Response['data']> {
    const rates = await this.prismaService.currency.findMany();
    return rates;
  }

  @MessagePattern(CorrencyGetOne.pattern)
  async getRate(
    data: CorrencyGetOne.Request['id']
  ): Promise<CorrencyGetOne.Response['data']> {
    const rate = await this.prismaService.currency.findUnique({
      where: {
        id: data,
      },
    });
    return rate;
  }

  @MessagePattern(ExchangeRateGetAll.pattern)
  async exchangeRates(): Promise<ExchangeRateGetAll.Response['data']> {
    const exchangeRates = await this.prismaService.exchangeRate.findMany();
    return exchangeRates;
  }

  @MessagePattern(ExchangeRateGetOne.pattern)
  async exchange(
    data: ExchangeRateGetOne.Request
  ): Promise<ExchangeRateGetOne.Response['rate']> {
    const exchange = await this.prismaService.exchangeRate.findFirst({
      where: {
        baseCurrencyId: data.from,
        targetCurrencyId: data.to,
      },
    });

    return exchange ? exchange.rate : null;
  }
  @MessagePattern('exchanges')
  async exchanges() {
    const exchanges = await this.prismaService.exchangeRate.findMany();
    return exchanges;
  }
}
