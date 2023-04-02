import { IsString, IsNotEmpty, IsEmail } from 'class-validator';
import { User as UserModel } from '@prisma/client';

export class CreateUserDto implements UserModel {
  @IsString()
  id: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  name: string;
}
