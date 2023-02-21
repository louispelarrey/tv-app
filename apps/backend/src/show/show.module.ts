import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/user.entity';
import { ShowController } from './show.controller';
import { Show } from './show.entity';
import { ShowService } from './show.service';

@Module({
  imports: [TypeOrmModule.forFeature([Show, User])],
  controllers: [ShowController],
  providers: [ShowService],
  exports: [ShowService]
})
export class ShowModule {}
