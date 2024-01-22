import { Module } from '@nestjs/common';
import { ConfigUsersModule } from '@project/shared/config/users';
import { BlogUserModule } from './blog-user/blog-user.module';
import { AuthenticationModule } from './authentication/authentication.module';

@Module({
  imports: [ConfigUsersModule, BlogUserModule, AuthenticationModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
