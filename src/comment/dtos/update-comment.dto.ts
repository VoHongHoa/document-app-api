import { IsString, IsNotEmpty } from 'class-validator';

export class UpdateCommentDto {
  @IsNotEmpty()
  @IsString()
  text: string;
}
