import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CelebrityModule } from '../celebrity/celebrity.module';
import { EpisodeModule } from '../episode/episode.module';
import { RoleGuard } from '../role/guard/role.guard';
import { SeasonModule } from '../season/season.module';
import { ShowModule } from '../show/show.module';
import { UserModule } from '../user/user.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import jwtConfig from '../auth/strategies/jwt.config';
import typeormConfig from '../config/typeorm.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [jwtConfig, typeormConfig],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return configService.get('typeorm')
      },
    }),
    UserModule,
    ShowModule,
    AuthModule,
    EpisodeModule,
    SeasonModule,
    CelebrityModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'APP_INTERCEPTOR',
      useClass: ClassSerializerInterceptor,
    },
    {
      provide: 'APP_GUARD',
      useClass: JwtAuthGuard,
    },
    {
      provide: 'APP_GUARD',
      useClass: RoleGuard,
    },
  ],
})
export class AppModule {}
