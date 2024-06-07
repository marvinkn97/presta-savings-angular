import { Routes } from '@angular/router';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { EmailconfirmComponent } from './pages/emailconfirm/emailconfirm.component';
import { ResendComponent } from './pages/resend/resend.component';

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
];
