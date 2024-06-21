import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { APIResponse } from '../dtos/api.response';
import { RegistrationRequest } from '../dtos/registration.request';
import { Endpoint } from '../enum/endpoint.enum';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  http: HttpClient = inject(HttpClient);
  private readonly BASE_URL = Endpoint.CUSTOMER_ENDPOINT;

  constructor() {}

  registerCustomer(
    registrationRequest: RegistrationRequest
  ): Observable<APIResponse> {
    console.log(registrationRequest);
    return this.http.post<APIResponse>(
      `${this.BASE_URL}/registration`,
      registrationRequest
    );
  }

  confirmEmail(code: string): Observable<APIResponse> {
    console.log(code);
    return this.http.post<APIResponse>(
      `${this.BASE_URL}/registration/confirm?token=${code}`,
      {}
    );
  }

  resendEmail(email: string) {
    this.http.post<APIResponse>(
      `${this.BASE_URL}/registration/resend?email=${email}`,
      {}
    );
  }

  getAllCustomers(): Observable<APIResponse> {
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set(
        'Authorization',
        `Bearer ${JSON.parse(sessionStorage.getItem('token')!)}`
      );

    console.log(headers);

    return this.http.get<APIResponse>(this.BASE_URL, { headers });
  }

  getCustomerByMemberNumber(memberNumber: string): Observable<APIResponse> {
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set(
        'Authorization',
        `Bearer ${JSON.parse(sessionStorage.getItem('token')!)}`
      );

    console.log(headers);

    return this.http.get<APIResponse>(`${this.BASE_URL}/${memberNumber}`, {
      headers,
    });
  }
}
