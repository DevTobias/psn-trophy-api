import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from '../auth/auth.module';
import { TitleGroups } from './models/query/title-groups.model';
import { TitleTrophies } from './models/query/title-trophies.model';
import { TrophyCounts } from './models/web/trophy-counts.model';
import { TrophyGroup } from './models/web/trophy-group.model';
import { Trophy } from './models/web/trophy.model';
import { TrophyWebRepository } from './repositories/trophy-web.repository';
import { TrophyResolver } from './trophy.resolver';
import { TrophyService } from './trophy.service';

@Module({
  providers: [TrophyResolver, TrophyService, TrophyWebRepository],
  exports: [TrophyService],
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([
      TitleTrophies,
      Trophy,
      TitleGroups,
      TrophyCounts,
      TrophyGroup,
    ]),
  ],
})
export class TrophyModule {}
