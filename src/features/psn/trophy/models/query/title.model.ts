import { Field, Int, ObjectType } from '@nestjs/graphql';

import { GroupedTrophies } from '../intern/grouped-trophies.model';
import { TrophyCounts } from '../web/trophy-counts.model';

@ObjectType()
export class Title {
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

  @Field((_type) => [GroupedTrophies])
  grouped_trophies: GroupedTrophies[];

  constructor(doc: unknown) {
    this.title_id = doc['title_id'];
    this.title_name = doc['title_name'];
    this.title_icon_url = doc['title_icon_url'];
    this.title_platform = doc['title_platform'];
    this.defined_trophies = doc['defined_trophies'];
    this.total_group_count = doc['total_group_count'];
    this.total_trophy_count = doc['total_trophy_count'];
    this.grouped_trophies = doc['grouped_trophies'];
  }
}
