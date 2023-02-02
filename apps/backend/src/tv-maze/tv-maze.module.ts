import { Module } from '@nestjs/common';
import { TvMazeController } from './tv-maze.controller';

@Module({
  controllers: [TvMazeController],
})
export class TvMazeModule {}
