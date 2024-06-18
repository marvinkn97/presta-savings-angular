import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RegistrationRequest } from '../../dtos/registration.request';
import { CustomerService } from '../../services/customer.service';
import { APIResponse } from '../../dtos/api.response';
import Swal from 'sweetalert2';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  registrationForm = new FormGroup({
    username: new FormControl('', Validators.required),
    fullName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
    mobileNumber: new FormControl('', [Validators.required]),
    governmentId: new FormControl('', Validators.required),
    kraPin: new FormControl('', Validators.required),
  });

  private customerService: CustomerService = inject(CustomerService);
  router: Router = inject(Router);

  register() {
    let registrationRequest: RegistrationRequest = {
      username: this.registrationForm.value.username ?? '',
      fullName: this.registrationForm.value.fullName ?? '',
      email: this.registrationForm.value.email ?? '',
      password: this.registrationForm.value.password ?? '',
      mobileNumber: this.registrationForm.value.mobileNumber ?? '',
      governmentId: this.registrationForm.value.governmentId ?? '',
      kraPin: this.registrationForm.value.kraPin ?? '',
    };

    this.customerService.registerCustomer(registrationRequest).subscribe(
      (response: APIResponse) => {
        console.log(response);
        Swal.fire({
          title: 'Customer Registration',
          text: response.data as string,
          icon: 'success',
        });
        this.registrationForm.reset();
        this.router.navigateByUrl('confirm');
      },
      (err) => {
        console.log(err.error);
      }
    );
  }
}
