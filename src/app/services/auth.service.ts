import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { LoginRequest } from '../dtos/login.request';
import { APIResponse } from '../dtos/api.response';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  http: HttpClient = inject(HttpClient);
  private readonly BASE_URL = 'http://localhost:8081/savings/api/v1/auth';

  constructor() {}

  authenticate(loginRequest: LoginRequest): Observable<APIResponse> {
    console.log(loginRequest);
    return this.http.post<APIResponse>(this.BASE_URL, loginRequest);
  }
}
