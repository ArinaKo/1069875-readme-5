import { PostStatus } from '@project/shared/app/types';
import { ArrayMaxSize, IsArray, IsDate, IsEnum, IsOptional, IsString, IsUrl, Length, Matches, MaxLength } from 'class-validator';

class BasePostDto {
  @IsOptional()
  public title?: string;

  @IsOptional()
  public description?: string;

  @IsEnum(PostStatus)
  @IsOptional()
  public status?: PostStatus;

  @IsArray()
  @ArrayMaxSize(8)
  @IsString({each: true})
  @Length(3, 10, {each: true})
  @IsOptional()
  public tags?: string[];

  @IsDate()
  @IsOptional()
  public publishDate?: Date;
}

export class UpdateVideoPostDto extends BasePostDto {
  @Length(20, 50)
  public title: string;

  @IsString()
  @Matches('/^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/')
  @IsOptional()
  public content: string;
}

export class UpdateTextPostDto extends BasePostDto {
  @Length(20, 50)
  public title: string;

  @Length(50, 255)
  public description: string;

  @Length(100, 1024)
  @IsOptional()
  public content: string;
}

export class UpdateQuotePostDto extends BasePostDto {
  @Length(3, 50)
  public description: string;

  @Length(20, 300)
  @IsOptional()
  public content: string;
}

export class UpdatePhotoPostDto extends BasePostDto {
  @IsString()
  @IsOptional()
  public content: string;
}

export class UpdateLinkPostDto extends BasePostDto {
  @MaxLength(50)
  @IsOptional()
  public description: string;

  @IsString()
  @IsUrl()
  @IsOptional()
  public content: string;
}

export type UpdatePostDto = (UpdateVideoPostDto
  | UpdateTextPostDto
  | UpdateQuotePostDto
  | UpdatePhotoPostDto
  | UpdateLinkPostDto);

