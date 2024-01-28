import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto {
  @ApiProperty({
    description: 'Uniq tag name',
    example: 'yolo',
  })
  public title: string;
}
