import { Routes } from '@angular/router';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { EmailconfirmComponent } from './pages/emailconfirm/emailconfirm.component';
import { ResendComponent } from './pages/resend/resend.component';
import { HomeComponent } from './pages/home/home.component';
import { UsersComponent } from './pages/users/users.component';
import { UserComponent } from './pages/user/user.component';

export const routes: Routes = [
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'confirm',
    component: EmailconfirmComponent,
  },
  {
    path: 'resend',
    component: ResendComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
    loadChildren: () => [
      {
        path: 'users',
        component: UsersComponent,
      },
      {
        path: 'users/:id',
        component: UserComponent,
      },
    ],
  },
];
