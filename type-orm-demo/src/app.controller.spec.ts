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

            expect(await appController.storeUser(CreateuserDto)).toEqual({
                name: 'sam',
                email: 'sam@gmail.com',
                favorite: 'game',
            });
        });
    });
});
