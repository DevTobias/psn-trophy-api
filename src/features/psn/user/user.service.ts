import { Injectable } from '@nestjs/common';

import { UserWebRepository } from './repositories/search-web.repository';

@Injectable()
export class UserService {
  constructor(private readonly userWebRepository: UserWebRepository) {}
}
