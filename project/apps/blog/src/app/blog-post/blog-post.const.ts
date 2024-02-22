import {
  CreateLinkPostDto,
  CreatePhotoPostDto,
  CreateQuotePostDto,
  CreateTextPostDto,
  CreateVideoPostDto,
} from './dto/create-post.dto';
import {
  UpdateLinkPostDto,
  UpdatePhotoPostDto,
  UpdateQuotePostDto,
  UpdateTextPostDto,
  UpdateVideoPostDto,
} from './dto/update-post.dto';
import { Sorting, PostType } from '@project/shared/app/types';

export const POSTS_LIMIT = 25;
export const DEFAULT_SORTING = Sorting.Date;
export const DEFAULT_PAGE_COUNT = 1;
export const SORTING_DIRECTION = 'desc';

export const CreateDtoListing = {
  [PostType.Video]: CreateVideoPostDto,
  [PostType.Text]: CreateTextPostDto,
  [PostType.Quote]: CreateQuotePostDto,
  [PostType.Photo]: CreatePhotoPostDto,
  [PostType.Link]: CreateLinkPostDto,
};

export const UpdateDtoListing = {
  [PostType.Video]: UpdateVideoPostDto,
  [PostType.Text]: UpdateTextPostDto,
  [PostType.Quote]: UpdateQuotePostDto,
  [PostType.Photo]: UpdatePhotoPostDto,
  [PostType.Link]: UpdateLinkPostDto,
};
