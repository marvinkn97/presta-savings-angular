import { Component, Input, inject, input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgIf } from '@angular/common';
import { Role } from '../../enum/role.enum';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NgbModule, NgIf],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  private authService: AuthService = inject(AuthService);

  isNavbarCollapsed = true;

  username = sessionStorage.getItem('username');

  @Input()
  role: string = '';

  logout() {
    this.authService.logout();
  }
}
