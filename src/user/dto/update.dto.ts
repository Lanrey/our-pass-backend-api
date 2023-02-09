import { IsDefined, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UpdateDto {
  @IsString()
  @IsDefined()
  password: string;

  @IsString()
  @IsNotEmpty()
  resetToken: string;
}
