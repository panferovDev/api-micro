import type { Currency } from '../types';

export namespace CurrencyGetAll {
  export const pattern = 'currency.getAll';
  export class Response {
    data!: Currency[];
  }
}
