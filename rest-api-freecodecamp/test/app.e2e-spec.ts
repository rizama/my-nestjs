import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { appendFile } from 'fs';
import { AppModule } from './../src/app.module';

describe('App (e2e)', () => {

    let app: INestApplication;
    beforeAll(async () => {

      // Create app.module
        const moduleRef = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        // Create app nestjs
        app = moduleRef.createNestApplication();
        
        // setting up custom app
        app.useGlobalPipes(
            new ValidationPipe({
                whitelist: true,
            }),
        );

        // run app
        await app.init();
    });

    afterAll(() => {
      app.close();
    })

    it.todo('sholud pass');
});
