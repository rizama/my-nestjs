import { Test, TestingModule } from '@nestjs/testing';
import { ThroneOfGlassService } from './throne-of-glass.service';

describe('ThroneOfGlassService', () => {
  let service: ThroneOfGlassService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ThroneOfGlassService],
    }).compile();

    service = module.get<ThroneOfGlassService>(ThroneOfGlassService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
