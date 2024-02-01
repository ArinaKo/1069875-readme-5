import { Module } from '@nestjs/common';
import { BlogPostService } from './blog-post.service';
import { BlogPostController } from './blog-post.controller';
import { BlogPostRepository } from './blog-post.repository';
import { PrismaClientModule } from '@project/shared/blog/models';

@Module({
  imports: [PrismaClientModule],
  providers: [BlogPostService, BlogPostRepository],
  controllers: [BlogPostController],
})
export class BlogPostModule {}
