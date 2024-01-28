import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class TagRdo {
  @ApiProperty({
    description: 'Uniq tag name',
    example: 'yolo',
  })
  @Expose()
  public title: string;
}
