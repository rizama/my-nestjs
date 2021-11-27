import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AppService } from './app.service';
import { User } from './user.entity';

describe('AppController', () => {
    let service: AppService;

    const mockUserRepository = {
        create: jest.fn().mockImplementation((dto) => dto),
        save: jest.fn().mockImplementation((user) =>
            Promise.resolve({
                id: Date.now(),
                ...user,
            }),
        ),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppService,
                {
                    provide: getRepositoryToken(User),
                    useValue: mockUserRepository,
                },
            ],
        }).compile();

        service = module.get<AppService>(AppService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should create user and return it', async () => {
        expect(
            await service.createUser({
                name: 'sam',
                email: 'sam@gmail.com',
                favorite: 'game',
            }),
        ).toEqual({
            id: expect.any(Number),
            name: 'sam',
            email: 'sam@gmail.com',
            favorite: 'game',
        });

        expect(mockUserRepository.create).toHaveBeenCalled();
    });
});
