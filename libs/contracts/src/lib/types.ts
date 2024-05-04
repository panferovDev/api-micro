export type Currency = {
  id: number;
  code: string;
  name: string;
  symbol: string;
};

export type ExchangeRate = {
  id: number;
  baseCurrencyId: number;
  targetCurrencyId: number;
  rate: number;
};
