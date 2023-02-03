import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CelebrityController } from './celebrity.controller';
import { Celebrity } from './celebrity.entity';
import { CelebrityService } from './celebrity.service';

@Module({
  imports: [TypeOrmModule.forFeature([Celebrity])],
  controllers: [CelebrityController],
  providers: [CelebrityService],
  exports: [CelebrityService]
})
export class CelebrityModule {}
