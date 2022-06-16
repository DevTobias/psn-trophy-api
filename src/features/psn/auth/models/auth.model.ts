/* eslint-disable @typescript-eslint/no-explicit-any */

import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Auth {
  @Field()
  access_token: string;

  @Field((type) => Int)
  expires_in: number;

  @Field()
  refresh_token: string;

  @Field((type) => Int)
  refresh_token_expires_in: number;

  constructor(doc: any) {
    this.access_token = doc.access_token;
    this.expires_in = doc.expires_in;
    this.refresh_token = doc.refresh_token;
    this.refresh_token_expires_in = doc.refresh_token_expires_in;
  }
}
