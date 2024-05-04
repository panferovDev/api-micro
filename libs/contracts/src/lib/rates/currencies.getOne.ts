import { IsInt } from 'class-validator';
import { Transform } from 'class-transformer';
import { Currency } from '../types';

export namespace CorrencyGetOne {
  export const pattern = 'currency.getOne';

  export class Params {
    @IsInt()
    @Transform(({ value }) => parseInt(value))
    id!: number;
  }
  export class Request {
    id!: number;
  }

  export class Response {
    data!: Currency | null;
  }
}
