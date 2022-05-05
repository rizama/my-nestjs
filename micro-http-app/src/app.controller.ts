import { Body, Controller, Get, Logger, Post } from '@nestjs/common';
import {
  ClientOptions,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { AppService } from './app.service';
import { MathService } from './math.service';

@Controller()
export class AppController {
  // Create a logger instance
  private logger = new Logger('AppController');

  constructor(
    private readonly appService: AppService,
    private readonly mathService: MathService
  ) {}

  private microserviceOptions: ClientOptions = {
    transport: Transport.TCP,
    options: {
      host: '127.0.0.1',
      port: 8877,
    },
  };

  private client = ClientProxyFactory.create(this.microserviceOptions);

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // Map the POST /add routeto this method
  @Post('add')
  // define the logic to be executed
  async accumulate(@Body('data') data: number[]) {
    this.logger.log(`Send Data to Microservice: ${data.toString()}`);

    // return this.client.send<number, number[]>('add', [1, 2, 3]);
    return await this.mathService.accumulate(data);
  }
}
