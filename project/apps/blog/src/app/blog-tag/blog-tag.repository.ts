import { Injectable } from '@nestjs/common';
import { Tag } from '@project/shared/app/types';

import { BasePostgresRepository } from '@project/shared/core';
import { BlogTagEntity } from './blog-tag.entity';
import { PrismaClientService } from '@project/shared/blog/models';

@Injectable()
export class BlogTagRepository extends BasePostgresRepository<
  BlogTagEntity,
  Tag
> {
  constructor(protected readonly client: PrismaClientService) {
    super(client, BlogTagEntity.fromObject);
  }

  public async findOrCreate(entities: BlogTagEntity[]): Promise<BlogTagEntity[]> {
    for (const entity of entities) {
     await this.client.tag.upsert({
        where: {
          title: entity.title
        },
        update: {},
        create: {
          ...entity.toPOJO()
        }
      });
    }

    return entities;
  }
}
