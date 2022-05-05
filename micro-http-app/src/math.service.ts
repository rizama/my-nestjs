import { Injectable } from '@nestjs/common';
import {
    ClientOptions,
    ClientProxy,
    ClientProxyFactory,
    Transport,
} from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Injectable()
export class MathService {
    private client: ClientProxy;

    private microserviceOptions: ClientOptions = {
        transport: Transport.TCP,
        options: {
            host: '127.0.0.1',
            port: 8877,
        },
    };

    constructor() {
        this.client = ClientProxyFactory.create(this.microserviceOptions);
    }

    accumulate(data: number[]): Observable<number> {
        return this.client.send<number, number[]>('add', data);
    }
}
