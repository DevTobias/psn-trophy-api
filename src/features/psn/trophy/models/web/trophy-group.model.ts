import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';

import { TitleGroups } from '../query/title-groups.model';
import { TrophyCounts } from './trophy-counts.model';
import { BaseEntity } from 'src/models/base-entity.model';

class TrophyGroupRelations extends BaseEntity {
  @ManyToOne(() => TitleGroups, (group) => group.trophy_groups)
  title: TitleGroups;
}

@ObjectType()
@Entity()
export class TrophyGroup extends TrophyGroupRelations {
  @Field()
  @Column('text')
  group_id: string;

  @Field()
  @Column('text')
  group_name: string;

  @Field()
  @Column('text')
  group_icon_url: string;

  @OneToOne((_type) => TrophyCounts, { cascade: true })
  @JoinColumn()
  defined_trophies: TrophyCounts;

  constructor(doc: unknown) {
    super();
    if (!doc) return;

    this.group_id = doc['trophyGroupId'];
    this.group_name = doc['trophyGroupName'];
    this.group_icon_url = doc['trophyGroupIconUrl'];
    this.defined_trophies = new TrophyCounts(doc['definedTrophies']);
  }
}
