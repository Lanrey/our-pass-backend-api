import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: number): Promise<User> {
    return this.usersRepository.findOne({
      where: {
        id,
      },
    });
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async resetPassword(data: any): Promise<Object> {
    const { email } = data;
    const user = await this.usersRepository.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      throw new BadRequestException({
        status: 'error',
        message: 'Invalid email passed',
      });
    }
    const userObject = await user.getUserJSON();
    const token = await this.jwtService.sign(userObject);

    await this.usersRepository.update(
      {
        email,
      },
      {
        resetToken: token,
      },
    );
    return { resetToken: token };
  }

  async updatePassword(data: any): Promise<Object> {
    const { password, resetToken } = data;
    const user = await this.usersRepository.findOne({
      where: {
        resetToken,
      },
    });

    if (!user) {
      throw new BadRequestException({
        status: 'error',
        message: 'Invalid token passed',
      });
    }
    const hash = await bcrypt.hash(password, 11);

    await this.usersRepository.update(
      {
        resetToken,
      },
      {
        resetToken: '',
        password: hash,
      },
    );
    return { message: 'Password change successful' };
  }

  async update(data: any, id: number): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: {
        id,
      },
    });

    if (!user) {
      throw new BadRequestException({
        status: 'error',
        message: 'Invalid User Details passed',
      });
    }

    await this.usersRepository.update(
      {
        id,
      },
      {
        ...data,
      },
    );
    return user;
  }

  async handleRegister(data: any): Promise<User> {
    const { email } = data;
    const user = await this.usersRepository.findOne({
      where: {
        email,
      },
    });

    if (user) {
      throw new BadRequestException({
        status: 'error',
        message: 'A user with that email already exists',
      });
    }
    const hash = await bcrypt.hash(data.password, 11);
    const updatedUser = { ...data, password: hash, resetToken: '' };
    return this.usersRepository.save(updatedUser);
  }

  async handleLogin(data: any) {
    const user = await this.usersRepository.findOne({
      where: {
        email: data.email,
      },
    });
    if (!user) {
      throw new BadRequestException({
        status: 'error',
        message: 'Invalid email or password',
      });
    }

    const checkPassword = await this.checkPasswordMatch(
      data.password,
      user.password,
    );

    if (!checkPassword) {
      throw new BadRequestException({
        status: 'error',
        message: 'Invalid email or password',
      });
    }
    const userObject = await user.getUserJSON();
    console.log({ userObject });

    const token = await this.jwtService.sign(userObject);
    return {
      token,
      user,
    };
  }

  async checkPasswordMatch(
    plainPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    console.log({ plainPassword, hashedPassword });
    return bcrypt.compare(plainPassword, hashedPassword);
  }
}