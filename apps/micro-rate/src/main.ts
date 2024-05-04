import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RABBITMQ_URL],
      queue: process.env.QUEUE_NAME,
      queueOptions: { durable: false },
    },
  });

  app.listen();
}

bootstrap();
