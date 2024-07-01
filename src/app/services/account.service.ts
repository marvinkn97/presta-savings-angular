import { Injectable, inject } from '@angular/core';
import { AccountRequest } from '../dtos/account.request';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { APIResponse } from '../dtos/api.response';
import { Endpoint } from '../enum/endpoint.enum';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  http: HttpClient = inject(HttpClient);
  private readonly BASE_URL = Endpoint.ACCOUNTS_ENDPOINT;

  constructor() {}

  createAccount(accountRequest: AccountRequest): Observable<APIResponse> {
    console.log(accountRequest);

    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set(
        'Authorization',
        `Bearer ${JSON.parse(sessionStorage.getItem('token')!)}`
      );

    console.log(headers);

    return this.http.post<APIResponse>(this.BASE_URL, accountRequest, {
      headers,
    });
  }

  getAllAccountByMemberNumber(memberNumber: string): Observable<APIResponse> {
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set(
        'Authorization',
        `Bearer ${JSON.parse(sessionStorage.getItem('token')!)}`
      );

    return this.http.get<APIResponse>(
      `${this.BASE_URL}/member/${memberNumber}`,
      { headers }
    );
  }
}
