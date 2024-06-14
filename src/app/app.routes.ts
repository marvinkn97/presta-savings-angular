import { Routes } from '@angular/router';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { EmailconfirmComponent } from './pages/emailconfirm/emailconfirm.component';
import { ResendComponent } from './pages/resend/resend.component';
import { HomeComponent } from './pages/home/home.component';
import { UsersComponent } from './pages/users/users.component';
import { UserComponent } from './pages/user/user.component';
import { CustomersComponent } from './pages/customers/customers.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CustomerDetailsComponent } from './pages/customer-details/customer-details.component';
import { CreateAccountComponent } from './pages/create-account/create-account.component';
import { MyAccountsComponent } from './pages/my-accounts/my-accounts.component';

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
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'users',
        component: UsersComponent,
      },
      {
        path: 'users/:id',
        component: UserComponent,
      },
      {
        path: 'customers',
        component: CustomersComponent,
      },
      {
        path: 'customers/:id',
        component: CustomerDetailsComponent,
      },
      {
        path: 'create-account',
        component: CreateAccountComponent,
      },
      {
        path: 'owner-accounts',
        component: MyAccountsComponent,
      },
    ],
  },
];
