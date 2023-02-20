import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { CelebrityModule } from '../celebrity/celebrity.module';
import { EpisodeModule } from '../episode/episode.module';
import { RoleGuard } from '../role/guard/role.guard';
import { SeasonModule } from '../season/season.module';
import { ShowModule } from '../show/show.module';
import { UserModule } from '../user/user.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: true,
    }),
    UserModule,
    ShowModule,
    AuthModule,
    EpisodeModule,
    SeasonModule,
    CelebrityModule,
    ConfigModule.forRoot()
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'APP_INTERCEPTOR',
      useClass: ClassSerializerInterceptor
    },
    {
      provide: 'APP_GUARD',
      useClass: RoleGuard
    }
  ],
})
export class AppModule {}

