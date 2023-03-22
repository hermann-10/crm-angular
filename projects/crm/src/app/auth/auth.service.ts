import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs";

export type RegisterData = {
    email: string;
    name: string;
    password: string;
}

export type LoginData = {
  email: string;
  password: string;
};


@Injectable()
export class AuthService {

    register(registerData: RegisterData){
        return this.http.post(
          'https://x8ki-letl-twmt.n7.xano.io/api:SYp5DbIo/auth/signup',
          registerData
        );
    }

    exists(email: string){
        return this.http.post<{ exists: boolean }>(
          'https://x8ki-letl-twmt.n7.xano.io/api:SYp5DbIo/user/validation/exists',
          {
            email,
          }
        )
        .pipe(map((response) => response.exists));   
    }

    login(loginData: LoginData){
        return this.http.post(
          'https://x8ki-letl-twmt.n7.xano.io/api:SYp5DbIo/auth/login',
          loginData
        );
    }

    logout() {}

    constructor(private http: HttpClient) {}
}