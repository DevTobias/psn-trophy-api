import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthProvider } from './auth.provider';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';

@Module({
  providers: [AuthResolver, AuthService, AuthProvider],
  imports: [ConfigModule],
  exports: [AuthProvider],
})
export class AuthModule {}
