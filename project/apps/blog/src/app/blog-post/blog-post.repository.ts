import { Injectable, NotFoundException } from '@nestjs/common';
import { PaginationResult, Post } from '@project/shared/app/types';
import { PrismaClientService } from '@project/shared/blog/models';
import { BasePostgresRepository } from '@project/shared/core';
import { BlogPostEntity } from './blog-post.entity';

@Injectable()
export class BlogPostRepository extends BasePostgresRepository<
  BlogPostEntity,
  Post
> {
  constructor(protected readonly client: PrismaClientService) {
    super(client, BlogPostEntity.fromObject);
  }

  public async save(entity: BlogPostEntity): Promise<BlogPostEntity> {
    const pojoEntity = entity.toPOJO();

    const record = await this.client.post.create({
      data: {
        ...pojoEntity,
        tags: {
          connectOrCreate: pojoEntity.tags.map(({ title }) => {
            return {
              where: { title },
              create: { title },
            };
          }),
        },
        comments: {
          connect: [],
        },
        likes: {
          connect: [],
        },
      },
    });

    entity.id = record.id;
    return entity;
  }

  public async deleteById(id: string): Promise<void> {
    await this.client.post.delete({
      where: {
        id,
      },
    });
  }

  public async findById(id: string): Promise<BlogPostEntity> {
    const record = await this.client.post.findFirst({
      where: {
        id,
      },
      include: {
        tags: true,
        comments: true,
        likes: true,
      },
    });

    if (!record) {
      throw new NotFoundException(`Post with id ${id} not found.`);
    }

    return this.createEntityFromDocument(record as Post);
  }

  public async update(
    id: string,
    entity: BlogPostEntity
  ): Promise<BlogPostEntity> {
    const pojoEntity = entity.toPOJO();
    const updatedPost = await this.client.post.update({
      where: { id },
      data: {
        title: pojoEntity.title,
        content: pojoEntity.content,
        description: pojoEntity.description,
        status: pojoEntity.status,
        publishDate: pojoEntity.publishDate,
        tags: {
          deleteMany: {},
          connectOrCreate: pojoEntity.tags.map(({ title }) => {
            return {
              where: { title },
              create: { title },
            };
          }),
        },
      },
      include: {
        tags: true,
        comments: true,
        likes: true,
      },
    });

    return this.createEntityFromDocument(updatedPost as Post);
  }
}
