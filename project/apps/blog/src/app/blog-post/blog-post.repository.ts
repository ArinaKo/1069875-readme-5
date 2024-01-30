import { Injectable, NotFoundException } from '@nestjs/common';
import { PaginationResult, Post, PostStatus, Sorting } from '@project/shared/app/types';
import { PrismaClientService } from '@project/shared/blog/models';
import { BasePostgresRepository } from '@project/shared/core';
import { BlogPostEntity } from './blog-post.entity';
import { BlogPostQuery } from './query/blog-post.query';
import { POSTS_LIMIT, SORTING_DIRECTION } from './blog-post.const';
import { Prisma } from '@prisma/client';

@Injectable()
export class BlogPostRepository extends BasePostgresRepository<
  BlogPostEntity,
  Post
> {
  constructor(protected readonly client: PrismaClientService) {
    super(client, BlogPostEntity.fromObject);
  }

  private async getPostCount(where: Prisma.PostWhereInput): Promise<number> {
    return this.client.post.count({ where });
  }

  private calculatePostsPage(totalCount: number): number {
    return Math.ceil(totalCount / POSTS_LIMIT);
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

  public async find(
    query: BlogPostQuery
  ): Promise<PaginationResult<BlogPostEntity>> {
    const skip = query.page ? (query.page - 1) * POSTS_LIMIT : undefined;
    const orderBy: Prisma.PostOrderByWithRelationInput = {};
    const where: Prisma.PostWhereInput = {
      status: PostStatus.Default
    };

    if (query?.type) {
      where.type = query.tag;
    }

    if (query?.tag) {
      where.tags = {
        some: {
          title: query.tag,
        },
      };
    }

    if (query?.userId) {
      where.userId = query.userId;
    }

    if (query?.sorting) {
      switch (query.sorting) {
        case Sorting.Likes:
          orderBy.likes = { _count: SORTING_DIRECTION };
          break;
        case Sorting.Comments:
          orderBy.comments = { _count: SORTING_DIRECTION };
          break;
        default:
          orderBy.publishDate = SORTING_DIRECTION;
      }
    }

    const [records, postCount] = await Promise.all([
      this.client.post.findMany({
        where,
        orderBy,
        skip,
        take: POSTS_LIMIT,
        include: {
          tags: true,
          comments: true,
          likes: true,
        },
      }),
      this.getPostCount(where),
    ]);

    return {
      entities: records.map((record) =>
        this.createEntityFromDocument(record as Post)
      ),
      currentPage: query?.page,
      totalPages: this.calculatePostsPage(postCount),
      itemsPerPage: POSTS_LIMIT,
      totalItems: postCount,
    };
  }
}
