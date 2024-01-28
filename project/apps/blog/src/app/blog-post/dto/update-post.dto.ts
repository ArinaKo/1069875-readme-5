export class UpdatePostDto {
  public title?: string;
  public description?: string;
  public content?: string;
  public status?: string;
  public tags?: string[];
  public publishDate?: Date;
}
