import { Module } from '@nestjs/common';
import { RateController } from './rate.controller';
import { ClientsModule, RmqOptions, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),

    ClientsModule.registerAsync([
      {
        name: 'RATE_SERVICE',
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (configService: ConfigService): RmqOptions => ({
          transport: Transport.RMQ,
          options: {
            urls: [configService.get<string>('RABBITMQ_URL')],
            queue: configService.get('QUEUE_NAME'),
            queueOptions: {
              durable: false,
            },
          },
        }),
      },
    ]),
  ],
  controllers: [RateController],
  providers: [],
})
export class RateModule {}
