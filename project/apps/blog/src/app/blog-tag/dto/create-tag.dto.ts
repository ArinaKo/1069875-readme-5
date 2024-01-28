import { ApiProperty } from '@nestjs/swagger';

export class CreateTagDto {
  @ApiProperty({
    description: 'Uniq tag name',
    example: 'yolo',
  })
  public title: string;
}
