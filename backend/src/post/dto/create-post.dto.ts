import {
  IsString,
  IsOptional,
  IsNotEmpty,
  IsBoolean,
  MinLength,
  MaxLength,
} from 'class-validator';
import { Post as PostModel } from '@prisma/client';

export class CreatePostDto implements PostModel {
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  title: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @MaxLength(100)
  description: string;

  @IsBoolean()
  published: boolean = false;

  @IsString()
  id: string;

  @IsString()
  userId: string;
}
