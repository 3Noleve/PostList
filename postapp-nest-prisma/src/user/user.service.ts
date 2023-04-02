import { Injectable } from '@nestjs/common';
import { User as UserModel } from '@prisma/client';
import { PrismaService } from '../database/prisma.service';
import { CreateUserDto, UpdateUserDto } from './dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(createUserDto: CreateUserDto): Promise<UserModel> {
    return this.prisma.user.create({ data: createUserDto });
  }

  async updateUser(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UserModel> {
    return this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  async findAllUsers(): Promise<UserModel[]> {
    return this.prisma.user.findMany({
      include: { posts: true },
    });
  }

  async findOneUser(id: string): Promise<UserModel> {
    return this.prisma.user.findUnique({
      where: { id },
      include: { posts: true },
    });
  }

  async deleteOneUser(id: string): Promise<UserModel> {
    const deletedUser = await this.prisma.user.delete({
      where: { id },
      include: { posts: true },
    });

    await this.prisma.post.deleteMany({ where: { userId: id } });

    return deletedUser;
  }

  async deleteAllUsers(): Promise<UserModel[]> {
    const usersToDelete = await this.prisma.user.findMany();
    await this.prisma.user.deleteMany();
    return usersToDelete;
  }

  async addPostToUser(userId: string, postId: string): Promise<UserModel> {
    return this.prisma.user.update({
      where: { id: userId },
      data: {
        posts: {
          connect: { id: postId },
        },
      },
    });
  }
}
