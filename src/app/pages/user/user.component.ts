import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [DatePipe, RouterLink],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
})
export class UserComponent implements OnInit {
  activeRoute: ActivatedRoute = inject(ActivatedRoute);
  private userService: UserService = inject(UserService);
  userId!: number;
  user!: any;
  loading = false;

  ngOnInit(): void {
    this.activeRoute.params.subscribe((p) => {
      console.log(p['id']);
      this.userId = p['id'];
    });

    this.loading = true;

    this.userService.getUserById(this.userId).subscribe((response) => {
      console.log(response);
      this.user = response.data;
      this.loading = false;
    });
  }
}
