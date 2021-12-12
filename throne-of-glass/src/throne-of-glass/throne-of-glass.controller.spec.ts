import { Test, TestingModule } from '@nestjs/testing';
import { ThroneOfGlassController } from './throne-of-glass.controller';

describe('ThroneOfGlassController', () => {
  let controller: ThroneOfGlassController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ThroneOfGlassController],
    }).compile();

    controller = module.get<ThroneOfGlassController>(ThroneOfGlassController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
