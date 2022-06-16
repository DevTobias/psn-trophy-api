import { Injectable } from '@nestjs/common';

import { AuthProvider } from '../../auth/auth.provider';

@Injectable()
export class SearchWebRepository {
  constructor(private readonly authProvider: AuthProvider) {}
}
