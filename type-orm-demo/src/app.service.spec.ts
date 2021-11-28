import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AppService } from './app.service';
import { User } from './user.entity';

describe('AppService', () => {
    let service: AppService;

    const data = [
        {
            id: 1,
            name: 'sam',
            email: 'sam@gmail.com',
            favorite: 'game',
        },
    ];

    const mockUserRepository = {
        create: jest.fn().mockImplementation((dto) => dto),
        save: jest.fn().mockImplementation((user) =>
            Promise.resolve({
                id: Date.now(),
                ...user,
            }),
        ),
        find: jest.fn().mockImplementation(() => {
            return [data];
        }),
        findOneOrFail: jest.fn().mockImplementation((id: number) => {
            return {
                id,
                ...data[0]
            };
        }),
        deleteUser: jest.fn((user) => {
            return {
                id: 1,
                ...user
            };
        })
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

    it('should find all users', async () => {
        expect(await service.getAll()).toEqual([data]);
        expect(mockUserRepository.find).toHaveBeenCalled();
    });

    it('should fetch user', async () => {
        const id = 1;
        const singleData = {
            id,
            name: 'sam',
            email: 'sam@gmail.com',
            favorite: 'game',
        };

        expect(await service.getOneById(id)).toEqual(singleData);
        expect(mockUserRepository.findOneOrFail).toHaveBeenCalled();
    });

    it('should update user', async () => {
        const updateUserDto = {
            name: 'sam',
            email: 'sam@gmail.com',
            favorite: 'game',
        };
        const id = 1;

        expect(await service.getOneById(id)).toEqual({
            id,
            ...updateUserDto
        });
        expect(mockUserRepository.findOneOrFail).toHaveBeenCalled();

        updateUserDto.name = "rizky";

        expect(await mockUserRepository.save(updateUserDto)).toEqual({
            id: expect.any(Number),
            name: 'rizky',
            email: 'sam@gmail.com',
            favorite: 'game',
        });

        expect(mockUserRepository.save).toHaveBeenCalled();
    }); 

    it('should delete user', async () => {
        const updateUserDto = {
            name: 'sam',
            email: 'sam@gmail.com',
            favorite: 'game',
        };
        const id = 1;

        expect(await service.getOneById(id)).toEqual({
            id,
            ...updateUserDto
        });
        expect(mockUserRepository.findOneOrFail).toHaveBeenCalled();

        updateUserDto.name = "rizky";

        expect(await mockUserRepository.deleteUser(updateUserDto)).toEqual({
            id: 1,
            name: 'rizky',
            email: 'sam@gmail.com',
            favorite: 'game',
        });

        expect(mockUserRepository.deleteUser).toHaveBeenCalled();
    }); 
});
