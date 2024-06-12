import { Component } from '@angular/core';
import { Role } from '../../enum/Role.enum';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NgIf],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  username: string = sessionStorage.getItem('username') as string;
  role: Role = sessionStorage.getItem('role') as Role;
}
