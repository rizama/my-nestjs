import { ClientOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

// same options object used used by microservices server
export const microserviceOptions: ClientOptions = {
    transport: Transport.GRPC,
    options: {
        package: 'app',
        protoPath: join(__dirname, '../src/app.proto'),
    },
};
