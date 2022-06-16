import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { Search } from './models/query/search.model';

import { SearchService } from './search.service';

@Resolver()
export class SearchResolver {
  constructor(private readonly searchService: SearchService) {}

  @Query((_returns) => Search, { name: 'search' })
  async getTitleTrophies(
    @Args('searchTerm') searchTerm: string,
  ): Promise<Search> {
    return this.searchService.getSearchResults(searchTerm);
  }
}
