import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToOne } from 'typeorm';

import { TitleTrophies } from '../query/title-trophies.model';
import { BaseEntity } from 'src/models/base-entity.model';

class TrophyRelations extends BaseEntity {
  @ManyToOne(() => TitleTrophies, (titleTrophy) => titleTrophy.trophies)
  title: TitleTrophies;
}

@ObjectType()
@Entity()
export class Trophy extends TrophyRelations {
  @Field()
  @Column('boolean')
  trophy_hidden: boolean;

  @Field()
  @Column('text')
  trophy_type: string;

  @Field()
  @Column('text')
  trophy_name: string;

  @Field()
  @Column('text')
  trophy_detail: string;

  @Field()
  @Column('text')
  trophy_icon_url: string;

  @Field()
  @Column('text')
  trophy_group_id: string;

  constructor(doc: unknown) {
    super();
    if (!doc) return;

    this.trophy_hidden = doc['trophyHidden'];
    this.trophy_type = doc['trophyType'];
    this.trophy_name = doc['trophyName'];
    this.trophy_detail = doc['trophyDetail'];
    this.trophy_icon_url = doc['trophyIconUrl'];
    this.trophy_group_id = doc['trophyGroupId'];
  }
}
