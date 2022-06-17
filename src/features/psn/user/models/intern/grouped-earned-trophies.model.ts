import { Field, Int, ObjectType } from '@nestjs/graphql';

import { EarnedTrophy } from './earned-trophy.model';
import { TrophyCounts } from 'src/features/psn/trophy/models/web/trophy-counts.model';

@ObjectType()
export class GroupedEarnedTrophies {
  @Field()
  group_id: string;

  @Field()
  group_name: string;

  @Field()
  group_icon_url: string;

  @Field((_type) => Int)
  group_trophy_count: number;

  @Field()
  defined_trophies: TrophyCounts;

  @Field()
  earned_trophies: TrophyCounts;

  @Field((_type) => Int)
  progress: number;

  @Field()
  last_updated: string;

  @Field((_type) => [EarnedTrophy])
  trophies: EarnedTrophy[];

  constructor(doc: unknown) {
    this.group_id = doc['group_id'];
    this.group_name = doc['group_name'];
    this.group_icon_url = doc['group_icon_url'];
    this.group_trophy_count = doc['group_trophy_count'];
    this.defined_trophies = doc['defined_trophies'];
    this.earned_trophies = doc['earned_trophies'];
    this.trophies = doc['trophies'];
    this.progress = doc['progress'];
    this.last_updated = doc['last_updated'] ?? '';
  }
}
