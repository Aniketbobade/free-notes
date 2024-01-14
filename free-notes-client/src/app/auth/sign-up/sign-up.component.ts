import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/common-service/api.service';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {

  user: any = {
    email: '',
    firstName: '',
    lastName: ''
  };
  selectedFile: File | null = null;

  constructor(private http: HttpClient, private apiService:ApiService, private router :Router) {}

  onSubmit(form: any): void {
    if (form.valid && this.selectedFile) {
      const formData = new FormData();
      formData.append('email', this.user.email);
      formData.append('firstName', this.user.firstName);
      formData.append('lastName', this.user.lastName);
      formData.append('profilePhoto', this.selectedFile, this.selectedFile.name);
      this.apiService.post('/signUp', formData, true)
        .subscribe(
          (response) => {
            console.log('User created:', response);
            let userMail=response.result.email;
            console.log(userMail);
            this.router.navigate(['/invite-mail'], {
              queryParams: { userMail: userMail }
            });
          },
          (error) => {
            console.error('Error uploading:', error);
          }
        );
    }
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }
}
