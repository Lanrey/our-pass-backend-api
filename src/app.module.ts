import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import config from './config/keys';
import { parse } from 'path/posix';
import { join } from 'path';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: config.postgresHost,
      port: parseInt(config.postgresPort),
      username: config.postgresUser,
      password: config.postgresPassword,
      database: config.postgresDatabase,
      entities: [join(__dirname, '**', '*.entity.{ts,js}')],
      // migrations: ['dist/migrations/*{.ts,.js}'],
      ssl: {
        rejectUnauthorized: false,
      },
      synchronize: true,
      // entities: [],
      // synchronize: true,
    }),
    UserModule,
    PostModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
