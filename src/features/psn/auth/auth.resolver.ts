import { Args, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { Auth } from './models/auth.model';

@Resolver((_of: void) => Auth)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Query((_returns) => Auth, { name: 'access_token' })
  async getAccessToken(@Args('npsso') npsso: string): Promise<Auth> {
    return this.authService.getAccessToken(npsso);
  }
}
