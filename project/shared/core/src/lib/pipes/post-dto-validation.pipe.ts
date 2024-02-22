import { ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { PipeTransform } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { reduceValidationErrors } from '@project/shared/helpers';

type DtoListing = Record<string, any>;

export class PostDtoValidationPipe implements PipeTransform<any> {
  private dtoListing: DtoListing;

  constructor(listing: DtoListing) {
    this.dtoListing = listing;
  }

  public async transform(value: any, { type }: ArgumentMetadata): Promise<any> {
    if (type === 'body') {
      const postType = value.type;
      const post = plainToInstance(this.dtoListing[postType], value);
      const classAValidationErrors = await validate(post);
      if (classAValidationErrors.length > 0) {
        throw new BadRequestException(
          reduceValidationErrors(classAValidationErrors)
        );
      }
    }
    return value;
  }
}
