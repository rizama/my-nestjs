import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from './app.service';
import { User } from './user.entity';

describe('AppController', () => {
    let service: AppService;

    const mockUserRepository = {};

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [AppService],
        }).overrideProvider(AppService)
        .useValue(mockUserRepository)
        .compile();

        service = module.get<AppService>(AppService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
