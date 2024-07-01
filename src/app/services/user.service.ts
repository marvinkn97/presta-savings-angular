import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { APIResponse } from '../dtos/api.response';
import { Observable } from 'rxjs';
import { Endpoint } from '../enum/endpoint.enum';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  http: HttpClient = inject(HttpClient);
  private readonly BASE_URL = Endpoint.USER_ENDPOINT;
  constructor() {}

  getAllUsers(): Observable<APIResponse> {
    let headers = new HttpHeaders()
      .set(
        'Authorization',
        `Bearer ${JSON.parse(sessionStorage.getItem('token')!)}`
      )
      .set('Content-Type', 'application/json');

    return this.http.get<APIResponse>(this.BASE_URL, { headers });
  }

  getUserById(id: number): Observable<APIResponse> {
    let headers = new HttpHeaders()
      .set(
        'Authorization',
        `Bearer ${JSON.parse(sessionStorage.getItem('token')!)}`
      )
      .set('Content-Type', 'application/json');

    return this.http.get<APIResponse>(`${this.BASE_URL}/${id}`, { headers });
  }
}
