import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerService } from '../../services/customer.service';
import { APIResponse } from '../../dtos/api.response';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-emailconfirm',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './emailconfirm.component.html',
  styleUrl: './emailconfirm.component.css',
})
export class EmailconfirmComponent {
  activationForm = new FormGroup({
    code: new FormControl('', Validators.required),
  });

  customerService: CustomerService = inject(CustomerService);
  router: Router = inject(Router);

  activateAccount() {
    this.customerService
      .confirmEmail(this.activationForm.value.code as string)
      .subscribe(
        (response: APIResponse) => {
          console.log(response);
          Swal.fire({
            title: response.reason,
            text: response.data as string,
            icon: 'success',
          });
          this.activationForm.reset();
          this.router.navigateByUrl('login');
        },
        (err) => {
          Swal.fire({
            title: err.error.reason,
            text: err.error.data,
            icon: 'error',
          });
        }
      );
  }

  resendToken() {
    this.router.navigateByUrl('resend');
  }
}
