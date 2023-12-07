import { IsString, IsOptional } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  display_name: string;

  @IsString()
  @IsOptional()
  avatar: string;

  @IsString()
  @IsOptional()
  status: 'Active' | 'Inactive';

  @IsString()
  @IsOptional()
  role: 'Admin' | 'User';
}
