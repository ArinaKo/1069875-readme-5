import { Post, PostType, PostStatus } from '@project/shared/app/types';
import { Entity } from '@project/shared/core';
import { BlogTagEntity } from '../blog-tag/blog-tag.entity';
import { BlogCommentEntity } from '../blog-comment/blog-comment.entity';
import { BlogLikeEntity } from '../blog-like/blog-like.entity';
import { CreatePostDto } from './dto/create-post.dto';

export class BlogPostEntity implements Post, Entity<string, Post> {
  public id?: string;
  public type: PostType;
  public title?: string;
  public description?: string;
  public content: string;
  public status: PostStatus;
  public userId: string;
  public tags: BlogTagEntity[];
  public comments: BlogCommentEntity[];
  public likes: BlogLikeEntity[];
  public isRepost: boolean;
  public originalId?: string;
  public publishDate?: Date;
  public createdAt?: Date;
  public updatedAt?: Date;

  public populate(data: Post): BlogPostEntity {
    this.id = data.id ?? undefined;
    this.type = data.type;
    this.title = data.title ?? undefined;
    this.description = data.description ?? undefined;
    this.content = data.content;
    this.status = data.status;
    this.userId = data.userId;
    this.isRepost = data.isRepost;
    this.originalId = data.originalId ?? undefined;
    this.publishDate = data.publishDate ?? undefined;
    this.createdAt = data.createdAt ?? undefined;
    this.updatedAt = data.updatedAt ?? undefined;
    this.likes = [];
    this.comments = [];
    this.tags = data.tags.map((tag) => BlogTagEntity.fromObject(tag));

    return this;
  }

  public toPOJO(): Post {
    return {
      id: this.id,
      type: this.type,
      title: this.title,
      description: this.description,
      content: this.content,
      status: this.status,
      userId: this.userId,
      isRepost: this.isRepost,
      originalId: this.originalId,
      publishDate: this.publishDate,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      likes: [],
      comments: [],
      tags: this.tags.map((tagEntity) => tagEntity.toPOJO()),
    };
  }

  static fromObject(data: Post): BlogPostEntity {
    return new BlogPostEntity()
      .populate(data);
  }

  static fromDto(dto: CreatePostDto, tags: BlogTagEntity[]): BlogPostEntity {
    const entity = new BlogPostEntity();
    entity.type = dto.type;
    entity.title = dto.title ?? undefined ;
    entity.description = dto.description ?? undefined;
    entity.content = dto.content;
    entity.status = dto.status;
    entity.userId = dto.userId;
    entity.isRepost = dto.isRepost;
    entity.originalId = dto.originalId ?? undefined;
    entity.tags = tags;
    entity.comments = [];
    entity.likes = [];

    return entity;
  }
}
