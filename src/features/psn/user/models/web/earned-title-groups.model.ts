import { Field, Int, ObjectType } from '@nestjs/graphql';

import { EarnedTitleGroup } from './earned-title-group.model';
import { TrophyCounts } from 'src/features/psn/trophy/models/web/trophy-counts.model';

@ObjectType()
export class EarnedTitleGroups {
  @Field((_type) => Int)
  progress: number;

  @Field()
  earned_trophies: TrophyCounts;

  @Field()
  last_updated: string;

  @Field((_type) => [EarnedTitleGroup])
  groups: [EarnedTitleGroup];

  constructor(doc: unknown) {
    this.progress = doc['progress'];
    this.earned_trophies = new TrophyCounts(doc['earnedTrophies']);
    this.last_updated = doc['lastUpdatedDateTime'];
    this.groups = doc['trophyGroups'].map(
      (group: unknown) => new EarnedTitleGroup(group),
    );
  }
}
