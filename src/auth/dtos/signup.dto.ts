// src/users/dto/create-user.dto.ts

import { IsString, IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class SignUpDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsOptional()
  display_name: string;
}
