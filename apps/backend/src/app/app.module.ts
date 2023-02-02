import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TvMazeController } from '../tv-maze/tv-maze.controller';
import { UserController } from '../user/user.controller';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'db',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'postgres',
      autoLoadEntities: true,
      synchronize: true,
    }),
    ConfigModule.forRoot()
  ],
  controllers: [AppController, TvMazeController, UserController],
  providers: [AppService],
})
export class AppModule {}
