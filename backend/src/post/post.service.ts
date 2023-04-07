import { Injectable } from '@nestjs/common';
import { Post as PostModel } from '@prisma/client';
import { PrismaService } from '../database/prisma.service';
import { CreatePostDto, UpdatePostDto } from './dto';

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}

  async createPost(createPostDto: CreatePostDto): Promise<PostModel> {
    const { title, description } = createPostDto;
    return this.prisma.post.create({
      data: {
        title,
        description,
      },
    });
  }

  async findAllPosts(): Promise<PostModel[]> {
    return this.prisma.post.findMany({
      include: { user: true },
    });
  }

  async findOnePost(id: string): Promise<PostModel> {
    return this.prisma.post.findUnique({
      where: { id },
      include: { user: true },
    });
  }

  async findPostsByUserId(userId: string): Promise<PostModel[]> {
    return this.prisma.post.findMany({
      where: { userId },
      include: { user: true },
    });
  }

  async updatePost(
    id: string,
    updatePostDto: UpdatePostDto,
  ): Promise<PostModel> {
    return this.prisma.post.update({
      where: { id },
      data: updatePostDto,
      include: { user: true },
    });
  }

  async deleteOnePost(id: string): Promise<PostModel> {
    return this.prisma.post.delete({ where: { id }, include: { user: true } });
  }

  async deleteAllPosts(): Promise<PostModel[]> {
    const postsToDelete = await this.prisma.post.findMany();
    await this.prisma.post.deleteMany();
    return postsToDelete;
  }
}
