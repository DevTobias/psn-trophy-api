import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Avatar {
  @Field()
  size: string;

  @Field()
  url: string;

  constructor(doc: unknown) {
    this.size = doc['size'];
    this.url = doc['url'];
  }
}
