import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { LoginRequest } from '../dtos/login.request';
import { APIResponse } from '../dtos/api.response';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http: HttpClient = inject(HttpClient);
  private readonly BASE_URL = 'http://localhost:8081/savings/api/v1/auth';
  private router: Router = inject(Router);

  constructor() {}

  authenticate(loginRequest: LoginRequest): void {
    console.log(loginRequest);
    this.http.post<APIResponse>(this.BASE_URL, loginRequest).subscribe(
      (response) => {
        console.log(response.data);
        if (response.status === 200) {
          localStorage.setItem('token', JSON.stringify(response.data));
          Swal.fire({
            title: response.reason,
            text: 'Authenticated',
            icon: 'success',
          });
        }
        this.router.navigateByUrl('home');
      },
      (err) => {
        console.error(err);
        Swal.fire({
          title: err.error.reason,
          text: err.error.data as string,
          icon: 'error',
        });
      }
    );
  }
}
