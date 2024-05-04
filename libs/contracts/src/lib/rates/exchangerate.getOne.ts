import { IsInt } from 'class-validator';
import { Transform } from 'class-transformer';

export namespace ExchangeRateGetOne {
  export const pattern = 'exchangeRate.getOne';

  export class Request {
    @IsInt()
    @Transform(({ value }) => parseInt(value))
    from!: number;
    @IsInt()
    @Transform(({ value }) => parseInt(value))
    to!: number;
  }

  export class Response {
    rate!: number | null;
  }
}
