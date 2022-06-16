import { Field, Int, ObjectType } from '@nestjs/graphql';

import { TrophyCounts } from '../web/trophy-counts.model';
import { Trophy } from '../web/trophy.model';

@ObjectType()
export class GroupedTrophies {
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

  @Field((_type) => [Trophy])
  trophies: Trophy[];

  constructor(doc: unknown) {
    this.group_id = doc['group_id'];
    this.group_name = doc['group_name'];
    this.group_icon_url = doc['group_icon_url'];
    this.group_trophy_count = doc['group_trophy_count'];
    this.defined_trophies = doc['defined_trophies'];
    this.trophies = doc['trophies'];
  }
}
