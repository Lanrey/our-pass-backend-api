import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UsePipes,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { ResetDto } from './dto/reset.dto';
import { LoginDto } from './dto/login.dto';
import { UpdateDto } from './dto/update.dto';
import { UpdateDetailsDto } from './dto/updateDetails.dto';
import { UserService } from './user.service';
import { User } from './user.entity';
import { UserAuthGuard } from './user.guard';
import { AuthenticatedUser } from './user.decorator';

@UsePipes(ValidationPipe)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id): Promise<User> {
    return this.userService.findOne(id);
  }

  @Post('register')
  handleRegister(@Body() registerData: RegisterDto): Promise<User> {
    return this.userService.handleRegister(registerData);
  }

  @Post('login')
  login(@Body() loginData: LoginDto): Promise<any> {
    return this.userService.handleLogin(loginData);
  }

  @Post('reset')
  reset(@Body() resetData: ResetDto): Promise<any> {
    return this.userService.resetPassword(resetData);
  }

  @Post('update')
  updatePassword(@Body() updateData: UpdateDto): Promise<any> {
    return this.userService.updatePassword(updateData);
  }

  @Delete(':id')
  delete(@Param('id') id): Promise<void> {
    return this.userService.remove(id);
  }

  @Put(':id')
  @UseGuards(UserAuthGuard)
  update(
    @Body() updateItemDto: any,
    @AuthenticatedUser() user: any,
  ): Promise<User> {
    return this.userService.update(updateItemDto, user.id);
  }
}