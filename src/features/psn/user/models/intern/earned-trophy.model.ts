import { Field, Float, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class EarnedTrophy {
  @Field()
  trophy_hidden: boolean;

  @Field()
  trophy_type: string;

  @Field()
  trophy_name: string;

  @Field()
  trophy_detail: string;

  @Field()
  trophy_icon_url: string;

  @Field()
  trophy_group_id: string;

  @Field()
  earned: boolean;

  @Field()
  earned_date: string;

  @Field((_type) => Int)
  rarity: number;

  @Field((_type) => Float)
  earned_rate: number;

  constructor(doc: unknown) {
    this.trophy_hidden = doc['trophy_hidden'];
    this.trophy_type = doc['trophy_type'];
    this.trophy_name = doc['trophy_name'];
    this.trophy_detail = doc['trophy_detail'];
    this.trophy_icon_url = doc['trophy_icon_url'];
    this.trophy_group_id = doc['trophy_group_id'];
    this.earned = doc['earned'];
    this.earned_date = doc['earned_date'] ?? '';
    this.rarity = doc['rarity'];
    this.earned_rate = doc['earned_rate'];
  }
}
