import { PostStatus, PostType } from '@project/shared/app/types';
import {
  ArrayMaxSize,
  IsArray,
  IsBoolean,
  IsEnum,
  IsMongoId,
  IsOptional,
  IsString,
  IsUUID,
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
  @IsEnum(PostType, { message: PostValidationMessage.type.invalidFormat })
  public type: PostType;

  @IsString()
  @IsOptional()
  public title: string;

  @IsString()
  @IsOptional()
  public description: string;

  @IsEnum(PostStatus, { message: PostValidationMessage.status.invalidFormat })
  public status: PostStatus;

  @IsMongoId()
  public userId: string;

  @IsArray()
  @ArrayMaxSize(MAX_TAGS_NUMBER, { message: PostValidationMessage.tags.value })
  @IsString({ each: true })
  @Length(TagLength.Min, TagLength.Max, {
    each: true,
    message: PostValidationMessage.tags.invalidItems,
  })
  public tags: string[];

  @IsBoolean()
  public isRepost: boolean;

  @IsUUID()
  @IsOptional()
  public originalId?: string;
}

export class CreateVideoPostDto extends BasePostDto {
  @Length(TitleLength.Min, TitleLength.Max, {
    message: PostValidationMessage.title.length,
  })
  public title: string;

  @IsString()
  @Matches(VIDEO_LINK_PATTERN, {
    message: PostValidationMessage.content.value.videoPost,
  })
  public content: string;
}

export class CreateTextPostDto extends BasePostDto {
  @Length(TitleLength.Min, TitleLength.Max, {
    message: PostValidationMessage.title.length,
  })
  public title: string;

  @Length(DescriptionLength.TextPost.Min, DescriptionLength.TextPost.Max, {
    message: PostValidationMessage.description.length.textPost,
  })
  public description: string;

  @IsString()
  @Length(ContentLength.TextPost.Min, ContentLength.TextPost.Max, {
    message: PostValidationMessage.content.length.textPost,
  })
  public content: string;
}

export class CreateQuotePostDto extends BasePostDto {
  @Length(DescriptionLength.QuotePost.Min, DescriptionLength.QuotePost.Max, {
    message: PostValidationMessage.description.length.quotePost,
  })
  public description: string;

  @IsString()
  @Length(ContentLength.QuotePost.Min, ContentLength.QuotePost.Max, {
    message: PostValidationMessage.content.length.quotePost,
  })
  public content: string;
}

export class CreatePhotoPostDto extends BasePostDto {
  @IsString()
  public content: string;
}

export class CreateLinkPostDto extends BasePostDto {
  @MaxLength(DescriptionLength.LinkPost.Max, {
    message: PostValidationMessage.description.length.linkPost,
  })
  @IsOptional()
  public description: string;

  @IsString()
  @IsUrl()
  public content: string;
}

export type CreatePostDto =
  | CreateVideoPostDto
  | CreateTextPostDto
  | CreateQuotePostDto
  | CreatePhotoPostDto
  | CreateLinkPostDto;
