import { Field, Float, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class SearchResult {
  @Field((_type) => Float)
  score: number;

  @Field()
  account_id: string;

  @Field()
  country: string;

  @Field()
  language: string;

  @Field()
  online_id: string;

  @Field()
  first_name: string;

  @Field()
  last_name: string;

  @Field()
  is_ps_plus: boolean;

  @Field()
  is_verified: boolean;

  @Field()
  avatar_url: string;

  constructor(doc: unknown) {
    this.score = doc['score'];
    this.account_id = doc['socialMetadata']['accountId'];
    this.country = doc['socialMetadata']['country'];
    this.language = doc['socialMetadata']['language'];
    this.online_id = doc['socialMetadata']['onlineId'];
    this.first_name = doc['socialMetadata']['firstName'] ?? '';
    this.last_name = doc['socialMetadata']['lastName'] ?? '';
    this.is_ps_plus = doc['socialMetadata']['isPsPlus'];
    this.is_verified = doc['socialMetadata']['isOfficiallyVerified'];
    this.avatar_url = doc['socialMetadata']['avatarUrl'];
  }
}
