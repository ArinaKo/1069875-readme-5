import { ConflictException, Injectable } from '@nestjs/common';
import { BlogUserRepository } from '../blog-user/blog-user.repository';
import { CreateUserDTO } from './dto/create-user.dto';
import { AUTH_USER_EXISTS } from './authentication.const';
import { BlogUserEntity } from '../blog-user/blog-user.entity';

@Injectable()
export class AuthenticationService {
  constructor(private readonly blogUserRepository: BlogUserRepository) {}

  public async register(dto: CreateUserDTO) {
    const { email, name, password, avatarUrl } = dto;

    const existedUser = await this.blogUserRepository.findByEmail(email);

    if (existedUser) {
      throw new ConflictException(AUTH_USER_EXISTS);
    }

    const userEntity = await new BlogUserEntity({
      email,
      name,
      avatarUrl: avatarUrl ?? '',
      passwordHash: '',
    }).setPassword(password);

    return this.blogUserRepository.save(userEntity);
  }
}
