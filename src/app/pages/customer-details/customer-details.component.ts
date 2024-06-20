import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CustomerService } from '../../services/customer.service';
import { APIResponse } from '../../domain/dtos/api.response';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-customer-details',
  standalone: true,
  imports: [RouterLink, DatePipe],
  templateUrl: './customer-details.component.html',
  styleUrl: './customer-details.component.css',
})
export class CustomerDetailsComponent implements OnInit {
  private activeRoute: ActivatedRoute = inject(ActivatedRoute);
  private customerService: CustomerService = inject(CustomerService);
  memberNumber: string = '';
  customer!: any;

  ngOnInit(): void {
    this.activeRoute.params.subscribe((p) => {
      console.log(p['id']);
      this.memberNumber = p['id'];
    });

    this.customerService
      .getCustomerByMemberNumber(this.memberNumber)
      .subscribe((response: APIResponse) => {
        console.log(response);
        this.customer = response.data;
      });
  }
}
