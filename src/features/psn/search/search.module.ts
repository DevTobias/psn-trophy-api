import { Module } from '@nestjs/common';

import { AuthModule } from '../auth/auth.module';
import { SearchWebRepository } from './repositories/search-web.repository';
import { SearchResolver } from './search.resolver';
import { SearchService } from './search.service';

@Module({
  providers: [SearchResolver, SearchService, SearchWebRepository],
  imports: [AuthModule],
})
export class SearchModule {}
