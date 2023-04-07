import { Module } from '@nestjs/common';
import { PrismaModule } from './database/prisma.module';
import { PostModule } from './post/post.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [PostModule, UserModule, PrismaModule],
})
export class AppModule {}
