import { Injectable } from '@nestjs/common';

import { SearchWebRepository } from './repositories/search-web.repository';

@Injectable()
export class SearchService {
  constructor(private readonly searchWebRepository: SearchWebRepository) {}
}
