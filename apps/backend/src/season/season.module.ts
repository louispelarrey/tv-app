import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Show } from '../show/show.entity';
import { SeasonController } from './season.controller';
import { Season } from './season.entity';
import { SeasonService } from './season.service';

@Module({
  imports: [TypeOrmModule.forFeature([Season, Show])],
  controllers: [SeasonController],
  providers: [SeasonService],
  exports: [SeasonService]
})
export class SeasonModule {}
