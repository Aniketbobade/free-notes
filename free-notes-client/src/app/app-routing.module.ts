import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { HomeComponent } from './feature/home/home.component';
import { DocumentDetailsComponent } from './feature/document-details/document-details.component';
import { InviteLinkMailComponent } from './auth/invite-link-mail/invite-link-mail.component';
import { DashboardComponent } from './user/dashboard/dashboard.component';
import { AuthGuard } from './user/AuthGuard/auth.guard';
import { ProfileComponent } from './user/profile/profile.component';

const routes: Routes = [
  {path:"", component:HomeComponent},
  {path:"login", component:LoginComponent},
  {path:"sign-up", component:SignUpComponent},
  {path:"document-details",component:DocumentDetailsComponent},
  { path: 'invite-mail', component: InviteLinkMailComponent },
  {path:"dashboard", component: DashboardComponent, canActivate: [AuthGuard] },
  {path:"profile", component: ProfileComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
