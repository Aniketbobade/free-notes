import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AppRoutingModule } from '../app-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { FileUploadComponent } from './dashboard/file-upload/file-upload.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MyDocumentsComponent } from './dashboard/my-documents/my-documents.component';
import { ChatListComponent } from './dashboard/chat/chat-list/chat-list.component';
import { ChatPersonalComponent } from './dashboard/chat/chat-personal/chat-personal.component';



@NgModule({
  declarations: [
    DashboardComponent,
    ProfileComponent,
    FileUploadComponent,
    MyDocumentsComponent,
    ChatListComponent,
    ChatPersonalComponent,

    
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule 
  ]
})
export class UserModule { }
