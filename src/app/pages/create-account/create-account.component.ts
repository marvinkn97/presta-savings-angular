import { Component, inject } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from '../../services/account.service';
import { AccountRequest } from '../../dtos/account.request';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-account',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './create-account.component.html',
  styleUrl: './create-account.component.css',
})
export class CreateAccountComponent {
  accountForm = new FormGroup({
    accountName: new FormControl('', [Validators.required]),
    accountType: new FormControl('', [Validators.required]),
  });

  accountService: AccountService = inject(AccountService);
  router: Router = inject(Router);

  createAccount() {
    let accountRequest: AccountRequest = {
      accountName: this.accountForm.value.accountName as string,
      accountType: this.accountForm.value.accountType as string,
    };

    this.accountService.createAccount(accountRequest).subscribe(
      (response) => {
        console.log(response);
        Swal.fire({
          title: response.reason,
          text: response.data as string,
          icon: 'success',
        });

        this.accountForm.reset();
        this.router.navigateByUrl('home/owner-accounts');
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
