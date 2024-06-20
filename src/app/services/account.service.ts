import { Injectable, inject } from '@angular/core';
import { AccountRequest } from '../domain/dtos/account.request';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { APIResponse } from '../domain/dtos/api.response';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  http: HttpClient = inject(HttpClient);
  private readonly BASE_URL = 'http://localhost:8081/savings/api/v1/accounts';
  token = sessionStorage.getItem('token');

  constructor() {}

  createAccount(accountRequest: AccountRequest): Observable<APIResponse> {
    console.log(this.token);

    console.log(accountRequest);

    let parsedToken = '';

    if (this.token) {
      parsedToken = JSON.parse(this.token);
    }

    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${parsedToken}`);

    console.log(headers);

    return this.http.post<APIResponse>(this.BASE_URL, accountRequest, {
      headers,
    });
  }
}
