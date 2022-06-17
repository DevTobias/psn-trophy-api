import { Field, Int, ObjectType } from '@nestjs/graphql';

import { UserTitle } from '../web/user-title.model';

@ObjectType()
export class UserTitles {
  @Field((_type) => Int)
  total_item_count: number;

  @Field((_type) => [UserTitle])
  user_titles: [UserTitle];

  constructor(doc: unknown) {
    this.total_item_count = doc['totalItemCount'];
    this.user_titles = doc['trophyTitles'].map(
      (title: unknown) => new UserTitle(title),
    );
  }
}
