import { Component, OnInit, inject } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.css',
})
export class CustomersComponent implements OnInit {
  private customerService: CustomerService = inject(CustomerService);
  customers: any;

  ngOnInit(): void {
    this.customerService.getAllCustomers().subscribe(
      (response) => {
        console.log(response);
        this.customers = response.data as {}[];
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
