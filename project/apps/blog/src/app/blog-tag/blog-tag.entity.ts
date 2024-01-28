import { Tag } from '@project/shared/app/types';
import { Entity } from '@project/shared/core';

export class BlogTagEntity implements Tag, Entity<string, Tag> {
  public id?: string;
  public title: string;

  constructor(data: Tag) {
    if (!data.title) {
      throw new Error('Tag title is required');
    }

    this.populate(data);
  }

  public populate(data: Tag): void {
    this.id = data.id ?? undefined;
    this.title = data.title;
  }

  public toPOJO(): Tag {
    return {
      id: this.id,
      title: this.title,
    };
  }

  static fromObject(data: Tag): BlogTagEntity {
    return new BlogTagEntity(data);
  }
}
