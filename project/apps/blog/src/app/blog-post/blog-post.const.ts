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
export const MAX_TAGS_NUMBER = 8;
export const VIDEO_LINK_PATTERN = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;

export enum TagLength {
  Min = 3,
  Max = 10,
}

export enum TitleLength {
  Min = 20,
  Max = 50,
}

export const DescriptionLength = {
  TextPost: {
    Min: 50,
    Max: 255,
  },
  QuotePost: {
    Min: 3,
    Max: 50,
  },
  LinkPost: {
    Max: 50,
  },
};

export const ContentLength = {
  TextPost: {
    Min: 100,
    Max: 1024,
  },
  QuotePost: {
    Min: 20,
    Max: 300,
  },
}

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
