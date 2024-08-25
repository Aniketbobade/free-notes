import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ApiService } from 'src/app/common-service/api.service'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup

  ngOnInit(): void {
    this.getProfile()
  }

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService
  ) {
    this.profileForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: [
        { value: '', disabled: true },
        [Validators.required, Validators.email],
      ],
    })
  }
  getProfile(): void {
    this.apiService.get('/profile').subscribe(
      (res: any) => {
        this.profileForm?.patchValue(res.user)
      },
      (error) => {
        console.error('Error fetching profile', error)
      }
    )
  }

  saveProfile(): void {}
}
