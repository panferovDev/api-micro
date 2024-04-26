import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('rates')
 async getData(data: string) {
    console.log('data', data);
    return { result: 'Обработка завершена', data: 'Jgggfff' };
  }
}
