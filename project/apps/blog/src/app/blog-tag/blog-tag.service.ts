import { ConflictException, Injectable } from '@nestjs/common';

import { BlogTagRepository } from './blog-tag.repository';
import { BlogTagEntity } from './blog-tag.entity';
import { CreateTagDto } from './dto/create-tag.dto';

@Injectable()
export class BlogTagService {
  constructor(
    private readonly blogTagRepository: BlogTagRepository
  ) {}

  public async getOrCreateTags(tags: CreateTagDto[]): Promise<BlogTagEntity[]> {
    return (await this.blogTagRepository.findOrCreate(tags.map((dto) => BlogTagEntity.fromObject(dto))));
  }
}
