import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { join } from 'path';
import { AppModule } from './app.module';

// Create a logger instance
const logger = new Logger('Main');

// Create the microservice options
const microserviceOptions = {
  // For TCP
  // transport: Transport.TCP,
  // options: {
  //   host: '127.0.0.1',
  //   port: 8877,
  // },

  // For REDIS
  // transport: Transport.REDIS,
  // options: {
  //   url: 'redis://localhost:6379/',
  // },

  // For GRPC
  transport: Transport.GRPC,
  options: {
    package: 'app',
    protoPath: join(__dirname, '../src/app.proto'),
  },
};

async function bootstrap() {
  const app = await NestFactory.createMicroservice(
    AppModule,
    microserviceOptions,
  );
  app.listen();
}
bootstrap();
