import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InviteLinkMailComponent } from './invite-link-mail/invite-link-mail.component';
import { AppTranslateModule } from '../feature/app.translate';


@NgModule({
  declarations: [
    SignUpComponent,
    LoginComponent,
    InviteLinkMailComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AppTranslateModule
  ]
})
export class AuthModule { }
