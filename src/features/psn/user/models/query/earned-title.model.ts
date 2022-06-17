import { Field, Int, ObjectType } from '@nestjs/graphql';

import { GroupedEarnedTrophies } from '../intern/grouped-earned-trophies.model';
import { TrophyCounts } from 'src/features/psn/trophy/models/web/trophy-counts.model';

@ObjectType()
export class EarnedTitle {
  @Field()
  title_id: string;

  @Field()
  title_name: string;

  @Field()
  title_icon_url: string;

  @Field()
  title_platform: string;

  @Field((_type) => Int)
  total_trophy_count: number;

  @Field((_type) => Int)
  total_group_count: number;

  @Field()
  defined_trophies: TrophyCounts;

  @Field()
  earned_trophies: TrophyCounts;

  @Field((_type) => [GroupedEarnedTrophies])
  grouped_trophies: GroupedEarnedTrophies[];

  constructor(doc: unknown) {
    this.title_id = doc['title_id'];
    this.title_name = doc['title_name'];
    this.title_icon_url = doc['title_icon_url'];
    this.title_platform = doc['title_platform'];
    this.defined_trophies = doc['defined_trophies'];
    this.earned_trophies = doc['earned_trophies'];
    this.total_group_count = doc['total_group_count'];
    this.total_trophy_count = doc['total_trophy_count'];
    this.grouped_trophies = doc['grouped_trophies'];
  }
}
