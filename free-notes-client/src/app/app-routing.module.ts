import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { LoginComponent } from './auth/login/login.component'
import { SignUpComponent } from './auth/sign-up/sign-up.component'
import { HomeComponent } from './feature/home/home.component'
import { DocumentDetailsComponent } from './feature/document-details/document-details.component'
import { InviteLinkMailComponent } from './auth/invite-link-mail/invite-link-mail.component'
import { DashboardComponent } from './user/dashboard/dashboard.component'
import { AuthGuard } from './user/AuthGuard/auth.guard'
import { ProfileComponent } from './user/profile/profile.component'
import { FileUploadComponent } from './user/dashboard/file-upload/file-upload.component'
import { MyDocumentsComponent } from './user/dashboard/my-documents/my-documents.component'
import { ChatListComponent } from './user/dashboard/chat/chat-list/chat-list.component'
import { ChatPersonalComponent } from './user/dashboard/chat/chat-personal/chat-personal.component'

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'document-details', component: DocumentDetailsComponent },
  { path: 'invite-mail', component: InviteLinkMailComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      // { path: 'setting', component: SettingComponent }, // Add your Setting component
      { path: 'upload-file', component: FileUploadComponent }, // Add your Upload File component
      { path: 'see-your-files', component: MyDocumentsComponent }, // Add your See Your Files component
      { path: 'profile', component: ProfileComponent }, // This route is already there, assuming you have a ProfileComponent
      { path: 'chat-list', component: ChatListComponent },
      { path: 'chat/:id', component: ChatPersonalComponent },
    ],
  },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
