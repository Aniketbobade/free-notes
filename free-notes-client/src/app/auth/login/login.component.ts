import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/common-service/api.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm:FormGroup= new FormGroup({});
  constructor(private formBuilder:FormBuilder, private apiService:ApiService){
  }

  ngOnInit(): void {
    this.loginForm=this.formBuilder.group({
      email:['', Validators.required],
      password:['', Validators.required]
    })
  }
  login(){
    this.apiService.post('/login',this.loginForm.value).subscribe((res: any)=>{
      if(res.success){
        localStorage.setItem('token',res.token);
      }
    }
    );
  }
}
