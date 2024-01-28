import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CategoryRdo {
  @ApiProperty({
    description: 'The uniq tag ID',
    example: '123',
  })
  @Expose()
  public id: string;

  @ApiProperty({
    description: 'Uniq tag name',
    example: 'yolo',
  })
  @Expose()
  public title: string;
}
