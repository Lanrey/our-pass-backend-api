import { IsDefined, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreatePostDto {
  @IsString()
  @IsDefined()
  title: string;

  @IsString()
  @IsDefined()
  content: string;
}
