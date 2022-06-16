import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GroupedTrophies } from './models/intern/grouped-trophies.model';

import { TitleGroups } from './models/query/title-groups.model';
import { TitleTrophies } from './models/query/title-trophies.model';
import { Title } from './models/query/title.model';
import { TrophyWebRepository } from './repositories/trophy-web.repository';

@Injectable()
export class TrophyService {
  constructor(
    private readonly trophyWebRepository: TrophyWebRepository,
    @InjectRepository(TitleTrophies)
    private readonly titleTrophyRepository: Repository<TitleTrophies>,
    @InjectRepository(TitleGroups)
    private readonly titleGroupsRepository: Repository<TitleGroups>,
  ) {}

  async getTitleTrophies(
    id: string,
    groupId: string,
    service: string,
  ): Promise<TitleTrophies> {
    const fromDb = await this.titleTrophyRepository.findOne({
      where: { title_id: id },
      relations: ['trophies'],
    });
    if (fromDb) return fromDb;

    const fromApi = await this.trophyWebRepository.getTitleTrophies(
      id,
      groupId,
      service,
    );

    await this.titleTrophyRepository.save(fromApi);
    return fromApi;
  }

  async getTitleGroups(id: string, service: string): Promise<TitleGroups> {
    const fromDb = await this.titleGroupsRepository.findOne({
      where: { title_id: id },
      relations: [
        'defined_trophies',
        'trophy_groups',
        'trophy_groups.defined_trophies',
      ],
    });
    if (fromDb) return fromDb;

    const fromApi = await this.trophyWebRepository.getTitleGroups(id, service);

    await this.titleGroupsRepository.save(fromApi);
    return fromApi;
  }

  async getTitle(id: string, service: string): Promise<Title> {
    const titleTrophies = await this.getTitleTrophies(id, 'all', service);
    const titleGroups = await this.getTitleGroups(id, service);

    const totalGroupCount = titleGroups.trophy_groups.length;

    const groupedTrophies = titleGroups.trophy_groups.map((group) => {
      const trophyCount =
        group.defined_trophies.bronze +
        group.defined_trophies.silver +
        group.defined_trophies.gold +
        group.defined_trophies.platinum;

      const trophies = titleTrophies.trophies.filter(
        (trophy) => trophy.trophy_group_id === group.group_id,
      );

      return new GroupedTrophies({
        group_id: group.group_id,
        group_name: group.group_name,
        group_icon_url: group.group_icon_url,
        group_trophy_count: trophyCount,
        defined_trophies: group.defined_trophies,
        trophies,
      });
    });

    return new Title({
      title_id: id,
      title_name: titleGroups.title_name,
      title_icon_url: titleGroups.title_icon_url,
      title_platform: titleGroups.title_platform,
      defined_trophies: titleGroups.defined_trophies,
      total_trophy_count: titleTrophies.total_item_count,
      total_group_count: totalGroupCount,
      grouped_trophies: groupedTrophies,
    });
  }
}
