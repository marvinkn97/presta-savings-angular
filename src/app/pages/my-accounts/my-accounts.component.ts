import { Component, OnInit, TemplateRef, inject } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { AccountRequest } from '../../dtos/account.request';
import { AccountService } from '../../services/account.service';
import { Customer } from '../../model/customer.model';
import { JsonPipe } from '@angular/common';
import { Account } from '../../model/account.model';
import { APIResponse } from '../../dtos/api.response';

@Component({
  selector: 'app-my-accounts',
  standalone: true,
  imports: [ReactiveFormsModule, JsonPipe],
  templateUrl: './my-accounts.component.html',
  styleUrl: './my-accounts.component.css',
})
export class MyAccountsComponent implements OnInit {
  private modalService = inject(NgbModal);
  accounts: Account[] = [];

  ngOnInit(): void {
    let memberNumber = sessionStorage.getItem('memNo') ?? '';
    this.accountService
      .getAllAccountByMemberNumber(memberNumber)
      .subscribe((response: APIResponse) => {
        console.log(response.data);
        this.accounts = response.data as Account[];
      });
  }

  open(content: TemplateRef<any>) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  accountForm = new FormGroup({
    accountName: new FormControl('', [Validators.required]),
    accountType: new FormControl('', [Validators.required]),
  });

  accountService: AccountService = inject(AccountService);
  router: Router = inject(Router);

  createAccount() {
    this.modalService.dismissAll();

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

    this.ngOnInit();
  }
}
