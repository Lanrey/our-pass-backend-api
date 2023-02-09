import { IsEmail, IsString, IsOptional } from 'class-validator';

export class UpdateDetailsDto {
  @IsOptional()
  @IsEmail()
  email: string;

  @IsString()
  @IsOptional()
  firstName: string;

  @IsString()
  @IsOptional()
  lastName: string;
}