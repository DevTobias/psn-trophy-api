import { Injectable } from '@nestjs/common';
import fetch from 'cross-fetch';

import { Auth } from './models/auth.model';

@Injectable()
export class AuthService {
  private async _exchangeNpssoForAccessCode(npsso: string): Promise<string> {
    const body = {
      access_type: 'offline',
      client_id: 'ac8d161a-d966-4728-b0ea-ffec22f69edc',
      redirect_uri: 'com.playstation.PlayStationApp://redirect',
      response_type: 'code',
      scope: 'psn:mobile.v1 psn:clientapp',
    };

    const url = 'https://ca.account.sony.com/api/authz/v3/oauth/authorize';

    const { headers } = await fetch(
      `${url}?${new URLSearchParams(body).toString()}`,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Cookie: `npsso=${npsso}`,
        },
        redirect: 'manual',
      },
    );

    const redirectLocation = headers.get('location');

    if (!redirectLocation?.includes('?code=')) return '';

    const accessCode = new URLSearchParams(
      redirectLocation.split('redirect/')[1],
    ).get('code') as string;

    return accessCode;
  }

  private async _exchangeCodeForAccessToken(accessCode: string): Promise<Auth> {
    const body = new URLSearchParams({
      code: accessCode,
      redirect_uri: 'com.playstation.PlayStationApp://redirect',
      grant_type: 'authorization_code',
      token_format: 'jwt',
    }).toString();

    const url = 'https://ca.account.sony.com/api/authz/v3/oauth/token';

    const res = await fetch(url, {
      method: 'POST',
      body,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        authorization:
          'Basic YWM4ZDE2MWEtZDk2Ni00NzI4LWIwZWEtZmZlYzIyZjY5ZWRjOkRFaXhFcVhYQ2RYZHdqMHY=',
      },
    });

    if (!res.ok)
      return {
        access_token: '',
        expires_in: -1,
        refresh_token: '',
        refresh_token_expires_in: -1,
      };

    return new Auth(await res.json());
  }

  async refreshAccessToken(refreshToken: string): Promise<Auth> {
    const body = new URLSearchParams({
      refresh_token: refreshToken,
      scope: 'psn:mobile.v1 psn:clientapp',
      grant_type: 'refresh_token',
      token_format: 'jwt',
    }).toString();

    const url = 'https://ca.account.sony.com/api/authz/v3/oauth/token';

    const res = await fetch(url, {
      method: 'POST',
      body,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        authorization:
          'Basic YWM4ZDE2MWEtZDk2Ni00NzI4LWIwZWEtZmZlYzIyZjY5ZWRjOkRFaXhFcVhYQ2RYZHdqMHY=',
      },
    });

    if (!res.ok)
      return {
        access_token: '',
        expires_in: -1,
        refresh_token: '',
        refresh_token_expires_in: -1,
      };

    return new Auth(await res.json());
  }

  async getAccessToken(npsso: string): Promise<Auth> {
    return this._exchangeCodeForAccessToken(
      await this._exchangeNpssoForAccessCode(npsso),
    );
  }
}
