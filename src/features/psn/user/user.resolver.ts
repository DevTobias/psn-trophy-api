import { Args, Query, Resolver } from '@nestjs/graphql';
import { EarnedTitle } from './models/query/earned-title.model';
import { UserProfile } from './models/query/profile.model';
import { UserTitles } from './models/query/user-titles.model';

import { UserService } from './user.service';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query((_returns) => UserProfile, { name: 'user_profile' })
  async getUserProfile(
    @Args('accountId') accountId: string,
  ): Promise<UserProfile> {
    return this.userService.getUserProfile(accountId);
  }

  @Query((_returns) => UserTitles, { name: 'user_titles' })
  async getUserTitles(
    @Args('accountId') accountId: string,
  ): Promise<UserTitles> {
    return this.userService.getUserTitles(accountId);
  }

  @Query((_returns) => EarnedTitle, { name: 'earned_title' })
  async getEarnedTitle(
    @Args('accountId') accountId: string,
    @Args('trophyId') trophyId: string,
    @Args('service') service: string,
  ): Promise<EarnedTitle> {
    return this.userService.getEarnedTitle(accountId, trophyId, service);
  }
}
