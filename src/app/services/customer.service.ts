import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { APIResponse } from '../dtos/api.response';
import { RegistrationRequest } from '../dtos/registration.request';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  http: HttpClient = inject(HttpClient);
  private readonly BASE_URL = 'http://localhost:8081/savings/api/v1/customers';

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
}
