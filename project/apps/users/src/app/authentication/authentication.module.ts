import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthenticationController } from './authentication.controller';
import { BlogUserModule } from '../blog-user/blog-user.module';

@Module({
  providers: [AuthenticationService],
  controllers: [AuthenticationController],
  imports: [BlogUserModule],
})
export class AuthenticationModule {}
