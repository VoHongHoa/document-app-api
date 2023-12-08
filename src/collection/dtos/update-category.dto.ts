import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateCollectionDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  theme_image: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsOptional()
  status: 'Active' | 'Inactive';
}
