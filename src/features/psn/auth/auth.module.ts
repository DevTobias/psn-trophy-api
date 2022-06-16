import { Module } from '@nestjs/common';
import { AuthProvider } from './auth.provider';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';

@Module({
  providers: [AuthResolver, AuthService, AuthProvider],
  exports: [AuthProvider],
})
export class AuthModule {}
