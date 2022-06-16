import { Module } from '@nestjs/common';

import { AuthModule } from '../auth/auth.module';
import { UserWebRepository } from './repositories/search-web.repository';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

@Module({
  providers: [UserResolver, UserService, UserWebRepository],
  imports: [AuthModule],
})
export class UserModule {}
