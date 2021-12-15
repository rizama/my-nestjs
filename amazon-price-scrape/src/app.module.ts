import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AmazonController } from './amazon/amazon.controller';
import { AmazonService } from './amazon/amazon.service';

@Module({
  imports: [],
  controllers: [AppController, AmazonController],
  providers: [AppService, AmazonService],
})
export class AppModule {}
