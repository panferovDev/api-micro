import { ExchangeRate } from "../types";

export namespace ExchangeRateGetAll {
    export const pattern = 'exchangeRate.getAll';
    export class Response {
        data!: ExchangeRate[];
    }
}