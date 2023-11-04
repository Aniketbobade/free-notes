import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/common-service/api.service';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {

  signUp:FormGroup= new FormGroup({});
 
  constructor(private formBuilder:FormBuilder,private apiService:ApiService){
  }

  ngOnInit(): void {
    this.signUp=this.formBuilder.group({
      email:['', Validators.required],
      firstName:['', Validators.required],
      lastName:['', Validators.required],
    })
  }
  register(){
    this.apiService.post('/signUp',this.signUp.value).subscribe((res: any)=>{
      console.log(res)
    })
  }  
}
