import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly URL = 'http://localhost:8080/auth';

  constructor(
    private http: HttpClient
  ) { }

  login(username: string, password: string): Observable<LoginResponse> {
    const payload: LoginRequest = {
      username,
      password
    };

    return this.http.post<LoginResponse>(
      `${this.URL}/login`,
      payload
    );

  }
}