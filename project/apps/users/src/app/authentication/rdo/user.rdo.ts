import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class UserRdo {
  @ApiProperty({
    description: 'The uniq user ID',
    example: '111',
  })
  @Expose()
  public id: string;

  @ApiProperty({
    description: 'User email',
    example: 'user@user.ru',
  })
  @Expose()
  public email: string;

  @ApiProperty({
    description: 'User name',
    example: 'John',
  })
  @Expose()
  public name: string;

  @ApiProperty({
    description: 'User avatar url',
    example: 'image.jpg',
  })
  @Expose()
  public avatarUrl: string;
}
