import { Injectable } from '@nestjs/common';

import { AuthProvider } from '../../auth/auth.provider';
import { Search } from '../models/query/search.model';
import { autoRefresh } from 'src/utils/autoRefresh';
import { post } from 'src/utils/fetch';

const SEARCH_BASE_URL = 'https://m.np.playstation.net/api/search';

@Injectable()
export class SearchWebRepository {
  constructor(private readonly authProvider: AuthProvider) {}

  async getSearchResults(term: string): Promise<Search> {
    const url = `${SEARCH_BASE_URL}/v1/universalSearch`;

    return autoRefresh<Search>(this.authProvider, async (token: string) => {
      return new Search(
        await post(url, token, {
          searchTerm: term,
          domainRequests: [
            {
              domain: 'SocialAllAccounts',
            },
          ],
        }),
      );
    });
  }
}
