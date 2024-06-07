import { Component, inject } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { LoginRequest } from '../../dtos/login.request';
import { AuthService } from '../../services/auth.service';
import { APIResponse } from '../../dtos/api.response';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  private authService: AuthService = inject(AuthService);

  login() {
    let loginRequest: LoginRequest = {
      username: this.loginForm.value.username as string,
      password: this.loginForm.value.password as string,
    };

    this.authService.authenticate(loginRequest).subscribe(
      (response: APIResponse) => {
        console.log(response);
        if (response.status === 200) {
          Swal.fire({
            title: response.reason,
            text: 'Authenticated',
            icon: 'success',
          });
        }
        this.loginForm.reset();
      },
      (err) => {
        console.log(err.error);
        Swal.fire({
          title: err.error.reason,
          text: err.error.data as string,
          icon: 'error',
        });
      }
    );
  }
}
