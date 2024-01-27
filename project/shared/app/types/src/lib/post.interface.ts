import { Comment } from "./comment.interface";
import { PostStatus } from "./post-status.enum";
import { PostType } from "./post-type.enum";

export interface Post {
  id?: string;
  type: PostType;
  title?: string;
  description?: string;
  content: string;
  status: PostStatus;
  userId: string;
  tags: string[];
  comments: Comment[];
  likesNumber: number;
  isRepost: boolean;
  originalId?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
