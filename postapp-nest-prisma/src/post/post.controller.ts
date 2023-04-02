import {
  Controller,
  Get,
  Post,
  Delete,
  Patch,
  Body,
  Param,
} from '@nestjs/common';

import { PostService } from './post.service';

import { CreatePostDto, UpdatePostDto } from './dto';

import { Post as PostModel } from '@prisma/client';
import { UserService } from 'src/user/user.service';

@Controller('posts')
export class PostController {
  constructor(
    private readonly postService: PostService,
    private readonly userService: UserService,
  ) {}

  @Post('user/:userId')
  async create(
    @Body() createPostDto: CreatePostDto,
    @Param('userId') userId: string,
  ): Promise<PostModel> {
    // Get the user to attach the post to
    const user = await this.userService.findOneUser(userId);

    if (!user) {
      throw new Error(`User with ID ${userId} not found`);
    }

    // Create the post
    const post = await this.postService.createPost(createPostDto);

    // Add the post to the user's list of posts
    await this.userService.addPostToUser(user.id, post.id);

    return post;
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePostDto: UpdatePostDto,
  ): Promise<PostModel> {
    return this.postService.updatePost(id, updatePostDto);
  }

  @Get()
  findAll(): Promise<PostModel[]> {
    return this.postService.findAllPosts();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<PostModel> {
    return this.postService.findOnePost(id);
  }

  @Get('user/:userId')
  findByUser(@Param('userId') userId: string): Promise<PostModel[]> {
    return this.postService.findPostsByUserId(userId);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<PostModel> {
    return this.postService.deleteOnePost(id);
  }

  @Delete()
  removeAll(): Promise<PostModel[]> {
    return this.postService.deleteAllPosts();
  }
}
