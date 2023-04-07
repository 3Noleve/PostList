import { Module } from '@nestjs/common';
import { PrismaModule } from '../database/prisma.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PostService } from 'src/post/post.service';

@Module({
  controllers: [UserController],
  providers: [UserService, PostService],
  imports: [PrismaModule],
})
export class UserModule {}
