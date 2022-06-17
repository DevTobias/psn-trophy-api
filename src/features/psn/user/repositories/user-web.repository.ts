import { Injectable } from '@nestjs/common';

import { AuthProvider } from '../../auth/auth.provider';
import { UserTitles } from '../models/query/user-titles.model';
import { EarnedTitleGroups } from '../models/web/earned-title-groups.model';
import { EarnedTitleTrophies } from '../models/web/earned-title-trophies.model';
import { ProfileSummary, UserProfile } from './user-web.types';
import { autoRefresh } from 'src/utils/autoRefresh';
import { get } from 'src/utils/fetch';

const SEARCH_BASE_URL =
  'https://m.np.playstation.net/api/userProfile/v1/internal/users';

const TROPHY_BASE_URL = 'https://m.np.playstation.net/api/trophy/v1/users';

@Injectable()
export class UserWebRepository {
  constructor(private readonly authProvider: AuthProvider) {}

  async getProfileSummary(accountId: string): Promise<ProfileSummary> {
    const url = `${TROPHY_BASE_URL}/${accountId}/trophySummary`;

    return autoRefresh<ProfileSummary>(
      this.authProvider,
      async (token: string) => {
        return await get(url, token);
      },
    );
  }

  async getUserProfile(accountId: string): Promise<UserProfile> {
    const url = `${SEARCH_BASE_URL}/${accountId}/profiles`;

    return autoRefresh<UserProfile>(
      this.authProvider,
      async (token: string) => {
        return await get(url, token);
      },
    );
  }

  async getUserTitles(accountId: string): Promise<UserTitles> {
    const url = `${TROPHY_BASE_URL}/${accountId}/trophyTitles`;

    return autoRefresh<UserTitles>(this.authProvider, async (token: string) => {
      return new UserTitles(await get(url, token));
    });
  }

  async getEarnedForTitle(
    accountId: string,
    trophyId: string,
    groupId: string,
    service: string,
  ): Promise<EarnedTitleTrophies> {
    const url = `${TROPHY_BASE_URL}/${accountId}/npCommunicationIds/${trophyId}/trophyGroups/${groupId}/trophies?npServiceName=${service}`;

    return autoRefresh<EarnedTitleTrophies>(
      this.authProvider,
      async (token: string) => {
        return new EarnedTitleTrophies(await get(url, token));
      },
    );
  }

  async getGroupsEarnedForTitle(
    accountId: string,
    trophyId: string,
    service: string,
  ): Promise<EarnedTitleGroups> {
    const url = `${TROPHY_BASE_URL}/${accountId}/npCommunicationIds/${trophyId}/trophyGroups?npServiceName=${service}`;

    return autoRefresh<EarnedTitleGroups>(
      this.authProvider,
      async (token: string) => {
        return new EarnedTitleGroups(await get(url, token));
      },
    );
  }
}
