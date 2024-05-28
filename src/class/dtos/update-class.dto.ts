import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateClassDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsOptional()
  status: 'Active' | 'Inactive';
}
