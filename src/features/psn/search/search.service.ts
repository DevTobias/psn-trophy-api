import { Injectable } from '@nestjs/common';
import { Search } from './models/query/search.model';

import { SearchWebRepository } from './repositories/search-web.repository';

@Injectable()
export class SearchService {
  constructor(private readonly searchWebRepository: SearchWebRepository) {}

  async getSearchResults(term: string): Promise<Search> {
    return this.searchWebRepository.getSearchResults(term);
  }
}
