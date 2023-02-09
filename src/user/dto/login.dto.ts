import { IsDefined, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @IsDefined()
  password: string;
}
