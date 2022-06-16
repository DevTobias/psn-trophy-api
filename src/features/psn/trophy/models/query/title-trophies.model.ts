import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';

import { Trophy } from '../web/trophy.model';
import { BaseEntity } from 'src/models/base-entity.model';

@ObjectType()
@Entity()
export class TitleTrophies extends BaseEntity {
  @Field()
  @Column('text')
  title_id: string;

  @Field()
  @Column('boolean')
  has_trophy_groups: boolean;

  @Field((_type) => Int)
  @Column('int')
  total_item_count: number;

  @Field((_type) => [Trophy])
  @OneToMany(() => Trophy, (trophy) => trophy.title, { cascade: true })
  trophies: Trophy[];

  constructor(doc: unknown) {
    super();
    if (!doc) return;

    this.title_id = doc['title_id'];
    this.has_trophy_groups = doc['hasTrophyGroups'];
    this.total_item_count = doc['totalItemCount'];
    this.trophies = doc['trophies'].map(
      (trophy: unknown) => new Trophy(trophy),
    );
  }
}
