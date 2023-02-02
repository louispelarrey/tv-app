import { Test, TestingModule } from '@nestjs/testing';
import { TvMazeController } from './tv-maze.controller';

describe('TvMazeController', () => {
  let controller: TvMazeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TvMazeController],
    }).compile();

    controller = module.get<TvMazeController>(TvMazeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
