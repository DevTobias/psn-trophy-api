import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, OneToMany, OneToOne, JoinColumn } from 'typeorm';

import { TrophyCounts } from '../web/trophy-counts.model';
import { TrophyGroup } from '../web/trophy-group.model';
import { BaseEntity } from 'src/models/base-entity.model';

@ObjectType()
@Entity()
export class TitleGroups extends BaseEntity {
  @Field()
  @Column('text')
  title_id: string;

  @Field()
  @Column('text')
  title_name: string;

  @Field()
  @Column('text')
  title_icon_url: string;

  @Field()
  @Column('text')
  title_platform: string;

  @Field()
  @OneToOne((_type) => TrophyCounts, { cascade: true })
  @JoinColumn()
  defined_trophies: TrophyCounts;

  @Field((_type) => [TrophyGroup])
  @OneToMany((_type) => TrophyGroup, (group) => group.title, { cascade: true })
  trophy_groups: TrophyGroup[];

  constructor(doc: unknown) {
    super();
    if (!doc) return;

    this.title_id = doc['title_id'];
    this.title_name = doc['trophyTitleName'];
    this.title_icon_url = doc['trophyTitleIconUrl'];
    this.title_platform = doc['trophyTitlePlatform'];
    this.defined_trophies = new TrophyCounts(doc['definedTrophies']);
    this.trophy_groups = doc['trophyGroups'].map(
      (group: unknown) => new TrophyGroup(group),
    );
  }
}
