import { PostStatus, PostType } from '@project/shared/app/types';
import { ArrayMaxSize, IsArray, IsBoolean, IsEnum, IsMongoId, IsOptional, IsString, IsUUID, IsUrl, Length, Matches, MaxLength } from 'class-validator';

class BasePostDto {
  @IsEnum(PostType)
  public type: PostType;

  @IsOptional()
  public title: string;

  @IsOptional()
  public description: string;

  @IsEnum(PostStatus)
  public status: PostStatus;

  @IsMongoId()
  public userId: string;

  @IsArray()
  @ArrayMaxSize(8)
  @IsString({each: true})
  @Length(3, 10, {each: true})
  public tags: string[];

  @IsBoolean()
  public isRepost: boolean;

  @IsUUID()
  @IsOptional()
  public originalId?: string;
}

export class CreateVideoPostDto extends BasePostDto {
  @Length(20, 50)
  public title: string;

  @IsString()
  @Matches(/^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/)
  public content: string;
}

export class CreateTextPostDto extends BasePostDto {
  @Length(20, 50)
  public title: string;

  @Length(50, 255)
  public description: string;

  @Length(100, 1024)
  public content: string;
}

export class CreateQuotePostDto extends BasePostDto {
  @Length(3, 50)
  public description: string;

  @Length(20, 300)
  public content: string;
}

export class CreatePhotoPostDto extends BasePostDto {
  @IsString()
  public content: string;
}

export class CreateLinkPostDto extends BasePostDto {
  @MaxLength(50)
  @IsOptional()
  public description: string;

  @IsString()
  @IsUrl()
  public content: string;
}

export type CreatePostDto = (CreateVideoPostDto
  | CreateTextPostDto
  | CreateQuotePostDto
  | CreatePhotoPostDto
  | CreateLinkPostDto);
