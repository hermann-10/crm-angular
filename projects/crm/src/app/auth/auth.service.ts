import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, InjectionToken } from '@angular/core';
import { BehaviorSubject, map, tap } from 'rxjs';
import { TokenManager } from './token-manager';
import { LocalStorageTokenManager } from './token-manager.service';

export type RegisterData = {
  email: string;
  name: string;
  password: string;
};

export type LoginData = {
  email: string;
  password: string;
};

export type LoginApiResponse = { authToken: string };

export const TOKEN_MANAGER = new InjectionToken('La classe à injecter pour stocker le token');

@Injectable()
export class AuthService {
  authStatus$ = new BehaviorSubject(false);

  register(registerData: RegisterData) {
    return this.http.post(
      'https://x8ki-letl-twmt.n7.xano.io/api:SYp5DbIo/auth/signup',
      registerData
    );
  }

  exists(email: string) {
    return this.http
      .post<{ exists: boolean }>(
        'https://x8ki-letl-twmt.n7.xano.io/api:SYp5DbIo/user/validation/exists',
        {
          email,
        }
      )
      .pipe(map((response) => response.exists));
  }

  login(loginData: LoginData) {
    return this.http
      .post<LoginApiResponse>(
        'https://x8ki-letl-twmt.n7.xano.io/api:SYp5DbIo/auth/login',
        loginData
      )
      .pipe(
        map((response) => response.authToken),

        tap((token) => {
          this.tokenManager.storeToken(token);
          this.authStatus$.next(true);
        })
      );
  }

  logout() {
    this.authStatus$.next(false);
    this.tokenManager.removeToken();
  }

  constructor(
    private http: HttpClient,
    @Inject(TOKEN_MANAGER) private tokenManager: TokenManager
  ) {
    this.tokenManager.loadToken().subscribe((token) => {
      if (token) {
        this.authStatus$.next(true); //The user is connected
      }
    });
  }
}
