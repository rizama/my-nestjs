import { Body, Controller, Get, Logger, Post } from '@nestjs/common';
import {
    Client,
    ClientGrpc,
    ClientOptions,
    ClientProxyFactory,
    Transport,
} from '@nestjs/microservices';
import { AppService } from './app.service';
import { IGrpcService } from './grpc.interface';
import { microserviceOptions } from './grpc.options';
import { MathService } from './math.service';

@Controller()
export class AppController {
    // Create a logger instance
    private logger = new Logger('AppController');

    @Client(microserviceOptions)
    private client: ClientGrpc;

    private grpcService: IGrpcService;

    // constructor(
    //   private readonly appService: AppService,
    //   private readonly mathService: MathService
    // ) {}

    // private microserviceOptions: ClientOptions = {
    //   transport: Transport.TCP,
    //   options: {
    //     host: '127.0.0.1',
    //     port: 8877,
    //   },
    // };

    // private client = ClientProxyFactory.create(this.microserviceOptions);

    onModuleInit() {
        this.grpcService =
            this.client.getService<IGrpcService>('AppController');
    }

    // @Get()
    // getHello(): string {
    //   return this.appService.getHello();
    // }

    // // Map the POST /add routeto this method
    // @Post('add')
    // // define the logic to be executed
    // async accumulate(@Body('data') data: number[]) {
    //   this.logger.log(`Send Data to Microservice: ${data.toString()}`);

    //   // return this.client.send<number, number[]>('add', [1, 2, 3]);
    //   return this.mathService.accumulate(data);
    // }

    @Post('add')
    async accumulate(@Body('data') data: number[]) {
        this.logger.log(`Send Data to Microservice: ${data.toString()}`);

        // return this.client.send<number, number[]>('add', [1, 2, 3]);
        return this.grpcService.accumulate({ data });
    }
}
