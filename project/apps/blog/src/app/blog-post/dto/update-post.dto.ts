import { PostStatus } from '@project/shared/app/types';
import {
  ArrayMaxSize,
  IsArray,
  IsDate,
  IsEnum,
  IsOptional,
  IsString,
  IsUrl,
  Length,
  Matches,
  MaxLength,
} from 'class-validator';
import {
  ContentLength,
  DescriptionLength,
  MAX_TAGS_NUMBER,
  TagLength,
  TitleLength,
  VIDEO_LINK_PATTERN,
} from '../blog-post.const';
import { PostValidationMessage } from '../messages/post-validation.messages';

class BasePostDto {
  @IsString()
  @IsOptional()
  public title?: string;

  @IsString()
  @IsOptional()
  public description?: string;

  @IsEnum(PostStatus, { message: PostValidationMessage.status.invalidFormat })
  @IsOptional()
  public status?: PostStatus;

  @IsArray()
  @ArrayMaxSize(MAX_TAGS_NUMBER, { message: PostValidationMessage.tags.value })
  @IsString({ each: true })
  @Length(TagLength.Min, TagLength.Max, {
    each: true,
    message: PostValidationMessage.tags.invalidItems,
  })
  @IsOptional()
  public tags?: string[];

  @IsDate()
  @IsOptional()
  public publishDate?: Date;
}

export class UpdateVideoPostDto extends BasePostDto {
  @Length(TitleLength.Min, TitleLength.Max, {
    message: PostValidationMessage.title.length,
  })
  public title?: string;

  @IsString()
  @Matches(VIDEO_LINK_PATTERN, {
    message: PostValidationMessage.content.value.videoPost,
  })
  @IsOptional()
  public content?: string;
}

export class UpdateTextPostDto extends BasePostDto {
  @Length(TitleLength.Min, TitleLength.Max, {
    message: PostValidationMessage.title.length,
  })
  public title?: string;

  @Length(DescriptionLength.TextPost.Min, DescriptionLength.TextPost.Max, {
    message: PostValidationMessage.description.length.textPost,
  })
  public description?: string;

  @IsString()
  @Length(ContentLength.TextPost.Min, ContentLength.TextPost.Max, {
    message: PostValidationMessage.content.length.textPost,
  })
  @IsOptional()
  public content?: string;
}

export class UpdateQuotePostDto extends BasePostDto {
  @Length(DescriptionLength.QuotePost.Min, DescriptionLength.QuotePost.Max, {
    message: PostValidationMessage.description.length.quotePost,
  })
  public description?: string;

  @IsString()
  @Length(ContentLength.QuotePost.Min, ContentLength.QuotePost.Max, {
    message: PostValidationMessage.content.length.quotePost,
  })
  @IsOptional()
  public content?: string;
}

export class UpdatePhotoPostDto extends BasePostDto {
  @IsString()
  @IsOptional()
  public content?: string;
}

export class UpdateLinkPostDto extends BasePostDto {
  @MaxLength(DescriptionLength.LinkPost.Max, {
    message: PostValidationMessage.description.length.linkPost,
  })
  @IsOptional()
  public description?: string;

  @IsString()
  @IsUrl()
  @IsOptional()
  public content?: string;
}

export type UpdatePostDto =
  | UpdateVideoPostDto
  | UpdateTextPostDto
  | UpdateQuotePostDto
  | UpdatePhotoPostDto
  | UpdateLinkPostDto;
