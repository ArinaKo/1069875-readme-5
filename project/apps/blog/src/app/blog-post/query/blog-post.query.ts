import { Transform } from 'class-transformer';
import { IsIn, IsString, IsOptional, IsMongoId } from 'class-validator';
import { DEFAULT_PAGE_COUNT, DEFAULT_SORTING } from '../blog-post.const';
import { PostType, Sorting } from '@project/shared/app/types';

export class BlogPostQuery {
  @IsMongoId()
  @IsOptional()
  public userId?: string;

  @IsString()
  @IsOptional()
  public tag?: string;

  @IsIn(Object.values(PostType))
  @IsOptional()
  public type?: PostType;

  @IsIn(Object.values(Sorting))
  @IsOptional()
  public sorting: Sorting = DEFAULT_SORTING;

  @Transform(({ value }) => +value || DEFAULT_PAGE_COUNT)
  @IsOptional()
  public page: number = DEFAULT_PAGE_COUNT;
}
