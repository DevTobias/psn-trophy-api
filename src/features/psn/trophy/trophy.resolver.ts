import { Args, Query, Resolver } from '@nestjs/graphql';

import { TitleGroups } from './models/query/title-groups.model';
import { TitleTrophies } from './models/query/title-trophies.model';
import { Title } from './models/query/title.model';
import { TrophyService } from './trophy.service';

@Resolver()
export class TrophyResolver {
  constructor(private readonly trophyService: TrophyService) {}

  @Query((_returns) => TitleTrophies, { name: 'title_trophies' })
  async getTitleTrophies(
    @Args('id') id: string,
    @Args('groupId') groupId: string,
    @Args('service') service: string,
  ): Promise<TitleTrophies> {
    return this.trophyService.getTitleTrophies(id, groupId, service);
  }

  @Query((_returns) => TitleGroups, { name: 'title_groups' })
  async getTitleGroups(
    @Args('id') id: string,
    @Args('service') service: string,
  ): Promise<TitleGroups> {
    return this.trophyService.getTitleGroups(id, service);
  }

  @Query((_returns) => Title, { name: 'title' })
  async getTitle(
    @Args('id') id: string,
    @Args('service') service: string,
  ): Promise<Title> {
    return this.trophyService.getTitle(id, service);
  }
}
