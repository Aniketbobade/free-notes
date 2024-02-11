import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AppRoutingModule } from '../app-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { FileUploadComponent } from './dashboard/file-upload/file-upload.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    DashboardComponent,
    ProfileComponent,
    FileUploadComponent,
    
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    ReactiveFormsModule   
  ]
})
export class UserModule { }
