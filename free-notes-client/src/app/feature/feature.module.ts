import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { DocumentDetailsComponent } from './document-details/document-details.component';
import { SafeUrl } from '@angular/platform-browser';
import { SafeUrlPipe } from '../pipes/safe-url.pipe';
import { MainComponent } from './main/main.component';
import { FooterComponent } from './footer/footer.component';
@NgModule({
  declarations: [
    HomeComponent,
    HeaderComponent,
    NavbarComponent,
    DocumentDetailsComponent,
    SafeUrlPipe,
    MainComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class FeatureModule { }
