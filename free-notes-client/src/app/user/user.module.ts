import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AppRoutingModule } from '../app-routing.module';
import { ProfileComponent } from './profile/profile.component';



@NgModule({
  declarations: [
    DashboardComponent,
    ProfileComponent,
    
  ],
  imports: [
    CommonModule,
    AppRoutingModule
  ]
})
export class UserModule { }
