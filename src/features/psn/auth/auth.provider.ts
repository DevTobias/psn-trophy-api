import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { AuthService } from './auth.service';
import { Auth } from './models/auth.model';

@Injectable()
export class AuthProvider {
  private auth: Auth;
  private npsso: string;

  constructor(
    private readonly authService: AuthService,
    private configService: ConfigService,
  ) {
    this._init();
  }

  private async _init() {
    this.npsso = this.configService.get<string>('NPSSO');
    this.auth = await this.authService.getAccessToken(this.npsso);
    console.log('---- SUCCESSFULLY INITIALIZED AUTH PROVIDER ----');
  }

  async refresh() {
    const auth = await this.authService.refreshAccessToken(
      this.auth.access_token,
    );

    if (!auth.access_token) {
      this.auth = await this.authService.getAccessToken(this.npsso);
    } else {
      this.auth = auth;
    }
  }

  getAuth = () => this.auth;
}
