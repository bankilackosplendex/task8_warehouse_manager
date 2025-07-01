import { Test, TestingModule } from '@nestjs/testing';
import { StockmovementsService } from './stockmovements.service';

describe('StockmovementsService', () => {
  let service: StockmovementsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StockmovementsService],
    }).compile();

    service = module.get<StockmovementsService>(StockmovementsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
