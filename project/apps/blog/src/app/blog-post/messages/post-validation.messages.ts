import { PostType } from '@project/shared/app/types';
import { transformObjectValuesToString } from '@project/shared/helpers';
import { TitleLength, DescriptionLength, ContentLength, TagLength, MAX_TAGS_NUMBER } from '../blog-post.const.js';

export const PostValidationMessage = {
  title: {
    length: `Title length min is ${TitleLength.Min}, max is ${TitleLength.Max}`,
  },
  description: {
    length: {
      textPost: `Description length min is ${DescriptionLength.TextPost.Min}, max is ${DescriptionLength.TextPost.Max}`,
      quotePost: `Description length min is ${DescriptionLength.QuotePost.Min}, max is ${DescriptionLength.QuotePost.Max}`,
      linkPost: `Description length max is ${DescriptionLength.LinkPost.Max}`,
    },
  },
  content: {
    length: {
      textPost: `Content length min is ${ContentLength.TextPost.Min}, max is ${ContentLength.TextPost.Max}`,
      quotePost: `Content length min is ${ContentLength.QuotePost.Min}, max is ${ContentLength.QuotePost.Max}`,
    },
    value: {
      videoPost: 'Field value must be a valid youtube link',
    },
  },
  type: {
    invalidFormat: `Field value must be from options: ${transformObjectValuesToString(PostType)}`,
  },
  tags: {
    value: `Maximum number of tags is ${MAX_TAGS_NUMBER}`,
    invalidItems: `Tag length min is ${TagLength.Min}, max is ${TagLength.Max}`,
  },
  status: {
    invalidFormat: `Field value must be from options: ${transformObjectValuesToString(PostType)}`,
  },

} as const;
