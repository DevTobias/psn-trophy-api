import { Injectable } from '@nestjs/common';

import { AuthProvider } from '../../auth/auth.provider';
import { TitleGroups } from '../models/query/title-groups.model';
import { TitleTrophies } from '../models/query/title-trophies.model';
import { get } from '../utils/fetch';

const TROPHY_BASE_URL = 'https://m.np.playstation.net/api/trophy/v1';

@Injectable()
export class TrophyWebRepository {
  constructor(private readonly authProvider: AuthProvider) {}

  async getTitleTrophies(
    id: string,
    groupId: string,
    service: string,
  ): Promise<TitleTrophies> {
    const url = `${TROPHY_BASE_URL}/npCommunicationIds/${id}/trophyGroups/${groupId}/trophies?npServiceName=${service}`;
    const token = this.authProvider.getAuth().access_token;
    return new TitleTrophies({ ...(await get(url, token)), title_id: id });
  }

  async getTitleGroups(id: string, service: string): Promise<TitleGroups> {
    const url = `${TROPHY_BASE_URL}/npCommunicationIds/${id}/trophyGroups?npServiceName=${service}`;
    const token = this.authProvider.getAuth().access_token;
    return new TitleGroups({ ...(await get(url, token)), title_id: id });
  }
}
