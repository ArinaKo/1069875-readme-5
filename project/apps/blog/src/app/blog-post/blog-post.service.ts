import { PaginationResult } from '@project/shared/app/types';
import { BlogPostRepository } from './blog-post.repository';
import { BlogPostQuery } from './query/blog-post.query';
import { BlogPostEntity } from './blog-post.entity';
import { UpdatePostDto } from './dto/update-post.dto';
import { CreatePostDto } from './dto/create-post.dto';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class BlogPostService {
  constructor(private readonly blogPostRepository: BlogPostRepository) {}

  public async getAllPosts(
    query: BlogPostQuery
  ): Promise<PaginationResult<BlogPostEntity>> {
    return await this.blogPostRepository.find(query);
  }

  public async getPost(id: string): Promise<BlogPostEntity> {
    try {
      return await this.blogPostRepository.findById(id);
    } catch {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }
  }

  public async createPost(dto: CreatePostDto): Promise<BlogPostEntity> {
    const newPost = BlogPostEntity.fromDto(dto);
    await this.blogPostRepository.save(newPost);
    return newPost;
  }

  public async updatePost(
    id: string,
    dto: UpdatePostDto
  ): Promise<BlogPostEntity> {
    const existsPost = await this.blogPostRepository.findById(id);
    if (!existsPost) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }

    let hasChanges = false;
    let isSameTags = false;

    for (const [key, value] of Object.entries(dto)) {
      if (value !== undefined && key !== 'tags' && existsPost[key] !== value) {
        existsPost[key] = value;
        hasChanges = true;
      }

      if (key === 'tags' && value) {
        const currentTags = existsPost.tags.map(({ title }) => title);
        isSameTags =
          currentTags.length === value.length &&
          currentTags.every((tag) => value.includes(tag));
      }
    }

    if (!hasChanges && isSameTags) {
      return existsPost;
    }

    return this.blogPostRepository.update(id, existsPost, dto.tags);
  }

  public async deletePost(id: string): Promise<void> {
    try {
      await this.blogPostRepository.deleteById(id);
    } catch {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }
  }
}
