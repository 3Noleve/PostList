import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  Patch,
} from '@nestjs/common';

import { CreateUserDto, UpdateUserDto } from './dto';
import { UserService } from './user.service';
import { PostService } from 'src/post/post.service';
import { User as UserModel, Post as PostModel } from '@prisma/client';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly postService: PostService,
  ) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<UserModel> {
    return this.userService.createUser(createUserDto);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserModel> {
    return this.userService.updateUser(id, updateUserDto);
  }

  @Get()
  findAll(): Promise<UserModel[]> {
    return this.userService.findAllUsers();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<UserModel> {
    return this.userService.findOneUser(id);
  }

  @Get(':userId/posts')
  findPostsByUser(@Param('userId') userId: string): Promise<PostModel[]> {
    return this.postService.findPostsByUserId(userId);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<UserModel> {
    return this.userService.deleteOneUser(id);
  }

  @Delete()
  removeAll(): Promise<UserModel[]> {
    return this.userService.deleteAllUsers();
  }
}
