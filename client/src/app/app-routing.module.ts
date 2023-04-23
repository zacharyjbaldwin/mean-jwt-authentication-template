import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './authentication/admin/admin.component';
import { LoginComponent } from './authentication/login/login.component';
import { ProfileComponent } from './authentication/profile/profile.component';
import { RegisterComponent } from './authentication/register/register.component';
import { AdminGuard } from './guards/admin.guard';
import { AuthenticationGuard } from './guards/authentication.guard';
import { HomeComponent } from './home/home.component';
import { VerifyEmailComponent } from './authentication/verify-email/verify-email.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'verify-email', component: VerifyEmailComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', canActivate: [AuthenticationGuard], component: ProfileComponent },
  { path: 'admin', canActivate: [AuthenticationGuard, AdminGuard], component: AdminComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
