import { PrismaClient } from '@prisma/client/rate/index.js';

const prisma = new PrismaClient();

async function main() {
  await prisma.currency.createMany({
    data: [
      { code: 'USD', name: 'US Dollar', symbol: '💵' },
      { code: 'EUR', name: 'Euro', symbol: '💶' },
      { code: 'JPY', name: 'Japanese Yen', symbol: '💴' },
      { code: 'GBP', name: 'British Pound', symbol: '💷' },
      { code: 'RUB', name: 'Russian Ruble', symbol: '🇷🇺' },
    ],
    skipDuplicates: true,
  });
  await prisma.exchangeRate.createMany({
    data: [
      { baseCurrencyId: 1, targetCurrencyId: 2, rate: 0.92 },
      { baseCurrencyId: 1, targetCurrencyId: 3, rate: 114.25 },
      { baseCurrencyId: 1, targetCurrencyId: 4, rate: 0.77 },
      { baseCurrencyId: 1, targetCurrencyId: 5, rate: 80.51 },
      { baseCurrencyId: 2, targetCurrencyId: 3, rate: 124.53 },
      { baseCurrencyId: 2, targetCurrencyId: 4, rate: 0.84 },
      { baseCurrencyId: 2, targetCurrencyId: 5, rate: 87.12 },
      { baseCurrencyId: 3, targetCurrencyId: 4, rate: 0.0068 },
      { baseCurrencyId: 3, targetCurrencyId: 5, rate: 0.7 },
      { baseCurrencyId: 4, targetCurrencyId: 5, rate: 103.22 },
    ],
    skipDuplicates: true, // Пропускает добавление, если курс уже существует
  });
}
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });