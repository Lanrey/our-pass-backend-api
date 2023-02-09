import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { JwtUserStrategy } from './strategies/jwt';
import { PassportModule } from '@nestjs/passport';
import config from '../config/keys';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    // PassportModule.register({ defaultStrategy: 'jwt-user-strategy' }),
    JwtModule.register({
      secret: config.jwtSecret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [UserService, JwtUserStrategy],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}