import { Field, ObjectType } from '@nestjs/graphql';

import { EarnedTitleTrophy } from './earned-title-trophy.model';

@ObjectType()
export class EarnedTitleTrophies {
  @Field()
  has_trophy_groups: boolean;

  @Field()
  last_updated: string;

  @Field((_type) => [EarnedTitleTrophy])
  trophies: [EarnedTitleTrophy];

  constructor(doc: unknown) {
    this.has_trophy_groups = doc['hasTrophyGroups'];
    this.last_updated = doc['lastUpdatedDateTime'];
    this.trophies = doc['trophies'].map(
      (trophy: unknown) => new EarnedTitleTrophy(trophy),
    );
  }
}
