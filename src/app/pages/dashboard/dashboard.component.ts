import { Component, OnInit, inject } from '@angular/core';
import { Role } from '../../domain/enum/Role.enum';
import { NgIf } from '@angular/common';
import { CustomerService } from '../../services/customer.service';
import { Account } from '../../domain/account.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NgIf],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  username: string = sessionStorage.getItem('username') as string;
  role: Role = sessionStorage.getItem('role') as Role;
  customerService: CustomerService = inject(CustomerService);
  memberNumber: string = sessionStorage.getItem('memNo') as string;
  accounts: any[] = [];
  accountCount = 0;
  totalBalance: number = 0;

  ngOnInit(): void {
    console.log(this.username);

    if (this.role === 'CUSTOMER' && this.memberNumber) {
      this.customerService
        .getCustomerByMemberNumber(this.memberNumber)
        .subscribe((response) => {
          sessionStorage.setItem('customer', JSON.stringify(response.data));
          const data = response.data as { accounts: any[] };

          console.log(data.accounts);
          this.accounts = data.accounts;
          this.accountCount = data.accounts.length;
        });
    }
  }

  getTotalBalanceForAllAccounts(): number {
    if (this.accounts.length > 0) {
      // Use reduce to accumulate the total balance
      let sum = this.accounts
        .map((a: Account) => a.balance) // Extract balances into an array
        .reduce((total: number, balance: number) => total + balance, 0); // Sum up all balances starting from 0
      this.totalBalance = sum;
    }
    return this.totalBalance;
  }
}
