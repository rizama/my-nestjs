import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../src/user.entity';

describe('AppController (e2e)', () => {
    let app: INestApplication;

    const data = [
        {
            id: 1,
            name: 'sam',
            email: 'sam@gmail.com',
            favorite: 'game',
        },
    ];

    const mockUserRepository = {
        find: jest.fn().mockImplementation(() => {
            return data;
        }),
    };

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        })
            .overrideProvider(getRepositoryToken(User))
            .useValue(mockUserRepository)
            .compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('/users (GET)', () => {
        return request(app.getHttpServer()).get('/users').expect(200).expect(data);
    });
});
