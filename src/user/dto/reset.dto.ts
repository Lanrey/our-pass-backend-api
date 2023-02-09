import { IsDefined, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class ResetDto {
  @IsString()
  @IsEmail()
  email: string;
}
