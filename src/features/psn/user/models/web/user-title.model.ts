import { Field, Int, ObjectType } from '@nestjs/graphql';

import { TrophyCounts } from 'src/features/psn/trophy/models/web/trophy-counts.model';

@ObjectType()
export class UserTitle {
  @Field()
  service: string;

  @Field()
  title_id: string;

  @Field()
  title_name: string;

  @Field()
  title_icon_url: string;

  @Field()
  platform: string;

  @Field()
  has_trophy_groups: boolean;

  @Field((_type) => Int)
  progress: number;

  @Field()
  last_updated: string;

  @Field()
  defined_trophies: TrophyCounts;

  @Field()
  earned_trophies: TrophyCounts;

  constructor(doc: unknown) {
    this.service = doc['npServiceName'];
    this.title_id = doc['npCommunicationId'];
    this.title_name = doc['trophyTitleName'];
    this.title_icon_url = doc['trophyTitleIconUrl'];
    this.platform = doc['trophyTitlePlatform'];
    this.has_trophy_groups = doc['hasTrophyGroups'];
    this.progress = doc['progress'];
    this.last_updated = doc['lastUpdatedDateTime'];
    this.defined_trophies = new TrophyCounts(doc['definedTrophies']);
    this.earned_trophies = new TrophyCounts(doc['earnedTrophies']);
  }
}
