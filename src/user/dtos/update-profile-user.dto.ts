import { IsString, IsOptional } from 'class-validator';

export class UpdateProfileUserDto {
  @IsString()
  @IsOptional()
  display_name: string;

  @IsString()
  @IsOptional()
  avatar: string;
}
