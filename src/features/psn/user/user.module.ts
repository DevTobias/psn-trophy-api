import { CacheModule, Module } from '@nestjs/common';

import { AuthModule } from '../auth/auth.module';
import { TrophyModule } from '../trophy/trophy.module';
import { UserWebRepository } from './repositories/user-web.repository';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

@Module({
  providers: [UserResolver, UserService, UserWebRepository],
  imports: [AuthModule, TrophyModule, CacheModule.register()],
})
export class UserModule {}
