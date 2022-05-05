import { Body, Controller, Get, Logger, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { MathService } from './math.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  // Create a logger instance
  private logger = new Logger('AppController');

  constructor(
    private readonly appService: AppService,
    private readonly mathService: MathService, // Inject the Math Service
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // // Map the POST /add routeto this method
  // @Post('add')
  // // define the logic to be executed
  // async accumulate(@Body('data') data: number[]) {
  //   this.logger.log(`Adding ${data.toString()}`);
  //   return this.mathService.accumulate(data);
  // }

  // Define the message pattern for this method
  @MessagePattern('add')
  // define the logic to be executed
  async accumulate(data: number[]) {
    this.logger.log(`Microservice Receice the data from apps`);
    this.logger.log(`Adding ${data.toString()}`);
    return this.mathService.accumulate(data);
  }
}
