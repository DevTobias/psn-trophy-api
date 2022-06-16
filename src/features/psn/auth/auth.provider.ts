import { Injectable } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Auth } from './models/auth.model';

@Injectable()
export class AuthProvider {
  private auth: Auth;

  constructor(private readonly authService: AuthService) {
    this._init();
  }

  private async _init() {
    this.auth = await this.authService.getAccessToken(
      'qQlfwhxU6ZweHZe6xZsrh9LxMwdWj7lBqwF9SugOPebjtgY03E3kEYMUAyd62KoO',
    );
  }

  getAuth = () => this.auth;
}
