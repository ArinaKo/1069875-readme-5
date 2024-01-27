export interface Comment {
  id?: string;
  message: string;
  userId: string;
  postId: string;
  createdAt?: Date;
}
