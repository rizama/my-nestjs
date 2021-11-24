import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CreateuserDto } from './dto/user-create.dto';

describe('AppController', () => {
    let appController: AppController;

    const data = [
        {
            id: 1,
            name: 'sam',
            email: 'sam@gmail.com',
            favorite: 'game',
        },
    ];

    const mockUserService = {
        createUser: jest.fn((dto) => {
            return {
                ...dto,
            };
        }),
        updateUser: jest.fn().mockImplementation((name: string, id: number) => {
            const body = {
                id,
                name,
                email: 'sam@gmail.com',
                favorite: 'game',
            };

            return body;
        }),
        getAll: jest.fn(() => {
            return data;
        }),
        getOneById: jest.fn((id) => {
            const singleData = {
                id,
                name: 'sam',
                email: 'sam@gmail.com',
                favorite: 'game',
            };

            return singleData;
        }),
        deleteUser: jest.fn((id) => {
            return {
                id,
                ...data[0],
            };
        }),
    };

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [AppController],
            providers: [AppService],
        })
            .overrideProvider(AppService)
            .useValue(mockUserService)
            .compile();

        appController = app.get<AppController>(AppController);
    });

    it('controller should be defined"', () => {
        expect(appController).toBeDefined();
    });

    it('should fetch all users', async () => {
        expect(await appController.getUsers()).toEqual(data);
        expect(mockUserService.getAll).toHaveBeenCalled();
    });

    it('should fetch user', async () => {
        const id = 1;
        const singleData = {
            id,
            name: 'sam',
            email: 'sam@gmail.com',
            favorite: 'game',
        };

        expect(await appController.getUser(id)).toEqual(singleData);
        expect(mockUserService.getOneById).toHaveBeenCalled();
    });

    it('should create a new user', async () => {
        const CreateuserDto: CreateuserDto = {
            name: 'sam',
            email: 'sam@gmail.com',
            favorite: 'game',
        };

        expect(await appController.storeUser(CreateuserDto)).toEqual(
            CreateuserDto,
        );
        expect(mockUserService.createUser).toHaveBeenCalled();
    });

    it('should update a new user', async () => {
        const updateUserDto = {
            name: 'rizky',
            email: 'sam@gmail.com',
            favorite: 'game',
        };
        const id = 1;

        expect(await appController.updateUser(id, updateUserDto)).toEqual({
            id: 1,
            ...updateUserDto,
        });
        expect(mockUserService.updateUser).toHaveBeenCalled();
    });

    it('should delete user', async () => {
        const id = 1;

        expect(await appController.deleteUser(id)).toEqual(data[0]);
        expect(mockUserService.deleteUser).toHaveBeenCalled();
    });
});
