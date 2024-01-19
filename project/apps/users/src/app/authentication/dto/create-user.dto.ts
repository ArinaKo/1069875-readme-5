import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: 'User email',
    example: 'user@user.ru',
  })
  public email: string;

  @ApiProperty({
    description: 'User name',
    example: 'John',
  })
  public name: string;

  @ApiProperty({
    description: 'User password',
    example: '123456',
  })
  public password: string;

  @ApiPropertyOptional({
    description: 'User avatar url',
    example: 'image.jpg',
  })
  public avatarUrl?: string;
}
