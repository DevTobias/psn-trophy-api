import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { GroupedTrophies } from '../trophy/models/intern/grouped-trophies.model';
import { TrophyService } from '../trophy/trophy.service';
import { EarnedTrophy } from './models/intern/earned-trophy.model';
import { GroupedEarnedTrophies } from './models/intern/grouped-earned-trophies.model';
import { EarnedTitle } from './models/query/earned-title.model';
import { UserProfile } from './models/query/profile.model';
import { UserTitles } from './models/query/user-titles.model';

import { UserWebRepository } from './repositories/user-web.repository';

@Injectable()
export class UserService {
  constructor(
    private readonly userWebRepository: UserWebRepository,
    private readonly trophyService: TrophyService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async getUserProfile(accountId: string): Promise<UserProfile> {
    const cachedProfile = await this.cacheManager.get<UserProfile>(
      `user-profile-${accountId}`,
    );

    if (cachedProfile) {
      return cachedProfile;
    }

    const summary = await this.userWebRepository.getProfileSummary(accountId);
    const user = await this.userWebRepository.getUserProfile(accountId);

    const createdProfile = new UserProfile({ ...summary, ...user });

    await this.cacheManager.set<UserProfile>(
      `user-profile-${accountId}`,
      createdProfile,
      { ttl: 30 * 60 },
    );

    return createdProfile;
  }

  async getUserTitles(accountId: string): Promise<UserTitles> {
    const cachedTitles = await this.cacheManager.get<UserTitles>(
      `user-titles-${accountId}`,
    );

    if (cachedTitles) {
      return cachedTitles;
    }

    const createdTitles = await this.userWebRepository.getUserTitles(accountId);

    await this.cacheManager.set<UserTitles>(
      `user-titles-${accountId}`,
      createdTitles,
      { ttl: 30 * 60 },
    );

    return createdTitles;
  }

  async getEarnedTitle(
    accountId: string,
    trophyId: string,
    service: string,
  ): Promise<EarnedTitle> {
    const cachedEarnedTitle = await this.cacheManager.get<EarnedTitle>(
      `user-earned-title-${accountId}`,
    );

    if (cachedEarnedTitle) {
      return cachedEarnedTitle;
    }

    const earnedTitles = await this.userWebRepository.getEarnedForTitle(
      accountId,
      trophyId,
      'all',
      service,
    );

    const earnedGroups = await this.userWebRepository.getGroupsEarnedForTitle(
      accountId,
      trophyId,
      service,
    );

    const titleTrophies = await this.trophyService.getTitle(trophyId, service);

    const groupedEarnedTrophies = titleTrophies.grouped_trophies.map(
      (group, groupIndex) => {
        const trophies = group.trophies.map((trophy, index) => {
          return new EarnedTrophy({
            ...trophy,
            earned: earnedTitles.trophies[index].earned,
            earned_date: earnedTitles.trophies[index].earned_date,
            rarity: earnedTitles.trophies[index].rarity,
            earned_rate: earnedTitles.trophies[index].earned_rate,
          });
        });

        return new GroupedEarnedTrophies({
          group_id: group.group_id,
          group_name: group.group_name,
          group_icon_url: group.group_icon_url,
          group_trophy_count: group.group_trophy_count,
          defined_trophies: group.defined_trophies,
          earned_trophies: earnedGroups.groups[groupIndex].earned_trophies,
          progress: earnedGroups.groups[groupIndex].progress,
          last_updated: earnedGroups.groups[groupIndex].last_updated,
          trophies,
        });
      },
    );

    const createdEarnedTitle = new EarnedTitle({
      title_id: titleTrophies.title_id,
      title_name: titleTrophies.title_name,
      title_icon_url: titleTrophies.title_icon_url,
      title_platform: titleTrophies.title_platform,
      total_trophy_count: titleTrophies.total_trophy_count,
      total_group_count: titleTrophies.total_group_count,
      defined_trophies: titleTrophies.defined_trophies,
      earned_trophies: earnedGroups.earned_trophies,
      grouped_trophies: groupedEarnedTrophies,
    });

    await this.cacheManager.set<EarnedTitle>(
      `user-earned-title-${accountId}`,
      createdEarnedTitle,
      { ttl: 30 * 60 },
    );

    return createdEarnedTitle;
  }
}
