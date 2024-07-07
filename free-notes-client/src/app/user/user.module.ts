import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AppRoutingModule } from '../app-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { FileUploadComponent } from './dashboard/file-upload/file-upload.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MyDocumentsComponent } from './dashboard/my-documents/my-documents.component';



@NgModule({
  declarations: [
    DashboardComponent,
    ProfileComponent,
    FileUploadComponent,
    MyDocumentsComponent,

    
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    ReactiveFormsModule   
  ]
})
export class UserModule { }
