import { Comment } from './comment.interface';
import { PostStatus } from './post-status.enum';
import { PostType } from './post-type.enum';
import { Tag } from './tag.interface';
import { Like } from './like.interface';

export interface Post {
  id?: string;
  type: PostType;
  title?: string;
  description?: string;
  content: string;
  status: PostStatus;
  userId: string;
  tags: Tag[];
  comments: Comment[];
  likes: Like[];
  isRepost: boolean;
  originalId?: string;
  publishDate?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}
