import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity } from 'typeorm';

import { BaseEntity } from 'src/models/base-entity.model';

@ObjectType()
@Entity()
export class TrophyCounts extends BaseEntity {
  @Field((_type) => Int)
  @Column('int')
  bronze: number;

  @Field((_type) => Int)
  @Column('int')
  silver: number;

  @Field((_type) => Int)
  @Column('int')
  gold: number;

  @Field((_type) => Int)
  @Column('int')
  platinum: number;

  constructor(doc: unknown) {
    super();
    if (!doc) return;

    this.bronze = doc['bronze'];
    this.silver = doc['silver'];
    this.gold = doc['gold'];
    this.platinum = doc['platinum'];
  }
}
