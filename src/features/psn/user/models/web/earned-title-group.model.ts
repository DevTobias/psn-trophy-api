import { Field, Int, ObjectType } from '@nestjs/graphql';
import { TrophyCounts } from 'src/features/psn/trophy/models/web/trophy-counts.model';

@ObjectType()
export class EarnedTitleGroup {
  @Field()
  group_id: string;

  @Field((_type) => Int)
  progress: number;

  @Field()
  earned_trophies: TrophyCounts;

  @Field()
  last_updated: string;

  constructor(doc: unknown) {
    this.group_id = doc['trophyGroupId'];
    this.progress = doc['progress'];
    this.earned_trophies = new TrophyCounts(doc['earnedTrophies']);
    this.last_updated = doc['lastUpdatedDateTime'];
  }
}
