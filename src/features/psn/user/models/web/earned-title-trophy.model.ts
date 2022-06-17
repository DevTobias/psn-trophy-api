import { Field, Float, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class EarnedTitleTrophy {
  @Field((_type) => Int)
  trophy_id: number;

  @Field()
  trophy_hidden: boolean;

  @Field()
  earned: boolean;

  @Field()
  type: string;

  @Field((_type) => Int)
  rarity: number;

  @Field((_type) => Float)
  earned_rate: number;

  @Field()
  earned_date: string;

  constructor(doc: unknown) {
    this.trophy_id = doc['trophyId'];
    this.trophy_hidden = doc['trophyHidden'];
    this.earned = doc['earned'];
    this.type = doc['trophyType'];
    this.earned_date = doc['earnedDateTime'];
    this.rarity = doc['trophyRare'];
    this.earned_rate = Number.parseFloat(doc['trophyEarnedRate']);
  }
}
