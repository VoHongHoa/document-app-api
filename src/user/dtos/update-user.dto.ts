import { IsString, IsEmail, IsNotEmpty } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  role: string;
}
