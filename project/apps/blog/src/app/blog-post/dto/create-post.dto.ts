import { PostStatus, PostType } from '@project/shared/app/types';

export class CreatePostDto {
  public type: PostType;
  public title?: string;
  public description?: string;
  public content: string;
  public status: PostStatus;
  public userId: string;
  public tags: string[];
  public isRepost: boolean;
  public originalId?: string;
}
