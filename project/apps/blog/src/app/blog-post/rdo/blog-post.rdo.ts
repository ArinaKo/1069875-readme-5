export class BlogPostRdo {
  public id: string;
  public type: string;
  public title?: string;
  public description?: string;
  public content: string;
  public status: string;
  public userId: string;
  public tags: string[];
  public comments: Comment[];
  public likes: number;
  public isRepost: boolean;
  public originalId?: string;
  public createdAt: Date;
  public publishDate: Date;
}
