import { Component, OnInit, inject } from '@angular/core';
import { UserService } from '../../services/user.service';
import { APIResponse } from '../../domain/dtos/api.response';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [DatePipe, RouterLink],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
})
export class UsersComponent implements OnInit {
  users!: any;
  private userService: UserService = inject(UserService);

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe(
      (response: APIResponse) => {
        console.log(response.data);
        this.users = response.data;
      },
      (err) => {
        console.log(err.error);
      }
    );
  }
}
