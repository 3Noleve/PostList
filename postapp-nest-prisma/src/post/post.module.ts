import { Module } from '@nestjs/common';
import { PrismaModule } from '../database/prisma.module';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { UserService } from 'src/user/user.service';

@Module({
  controllers: [PostController],
  providers: [PostService, UserService],
  imports: [PrismaModule],
})
export class PostModule {}
