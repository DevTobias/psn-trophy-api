import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Avatar } from '../web/avatar.model';
import { TrophyCounts } from 'src/features/psn/trophy/models/web/trophy-counts.model';

@ObjectType()
export class UserProfile {
  @Field()
  online_id: string;

  @Field()
  account_id: string;

  @Field()
  about_me: string;

  @Field()
  is_ps_plus: boolean;

  @Field()
  is_verified: boolean;

  @Field((_type) => Int)
  trophy_level: number;

  @Field((_type) => Int)
  progress: number;

  @Field((_type) => Int)
  tier: number;

  @Field((_type) => TrophyCounts)
  earned_trophies: TrophyCounts;

  @Field((_type) => [String])
  languages: string[];

  @Field((_type) => [Avatar])
  avatars: Avatar[];

  constructor(doc: unknown) {
    this.online_id = doc['onlineId'];
    this.account_id = doc['accountId'];
    this.about_me = doc['aboutMe'];
    this.is_ps_plus = doc['isPlus'];
    this.is_verified = doc['isOfficiallyVerified'];
    this.trophy_level = doc['trophyLevel'];
    this.progress = doc['progress'];
    this.tier = doc['tier'];
    this.earned_trophies = new TrophyCounts(doc['earnedTrophies']);
    this.languages = doc['languages'];
    this.avatars = doc['avatars'].map((avatar: unknown) => new Avatar(avatar));
  }
}
