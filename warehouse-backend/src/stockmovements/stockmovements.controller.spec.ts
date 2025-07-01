import { Test, TestingModule } from '@nestjs/testing';
import { StockmovementsController } from './stockmovements.controller';
import { StockmovementsService } from './stockmovements.service';

describe('StockmovementsController', () => {
  let controller: StockmovementsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StockmovementsController],
      providers: [StockmovementsService],
    }).compile();

    controller = module.get<StockmovementsController>(StockmovementsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
