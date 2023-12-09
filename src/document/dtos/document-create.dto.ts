// src/users/dto/create-user.dto.ts

import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateDocumentDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsNumber()
  total_page: number;

  @IsNotEmpty()
  @IsString()
  theme_image: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsString()
  url_download: string;

  @IsString()
  @IsOptional()
  category_id: string;

  @IsString()
  @IsOptional()
  collection_id: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsOptional()
  status: 'Active' | 'Inactive';
}
