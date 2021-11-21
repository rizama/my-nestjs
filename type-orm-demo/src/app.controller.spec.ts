import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CreateuserDto } from './dto/user-create.dto';

describe('AppController', () => {
    let appController: AppController;

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
            }

            return body;
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

    describe('Users Module', () => {
        it('controller should be defined"', () => {
            expect(appController).toBeDefined();
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
                ...updateUserDto
            });
            expect(mockUserService.updateUser).toHaveBeenCalled();
        });
    });
});
