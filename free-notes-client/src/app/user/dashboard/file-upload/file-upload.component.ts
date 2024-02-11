import { HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/common-service/api.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {
  fileUploadForm: FormGroup;
  selectedField: any;
  subjects: any[] = []; // You need to populate this array with subjects based on the selected field
  fields:any[]=[];

  constructor(private apiService: ApiService,private formBuilder: FormBuilder, private http: HttpClient) {
    this.fileUploadForm = this.formBuilder.group({
      fileName: ['', Validators.required],
      description: ['', Validators.required],
      field: ['', Validators.required],
      subject: ['', Validators.required],
      file: [null, Validators.required]
    });
  }
  ngOnInit(): void {
    this.loadFields();
  }
  loadFields(){
    this.apiService.get('/get-fields').subscribe((res: any) => {
      console.log(res);
      this.fields = res;
    });
  }
  onFieldChange() {
    this.selectedField = this.fileUploadForm.get('field')?.value;
    console.log(this.selectedField);
    this.apiService.get(`/get-subjects?fieldId=${this.selectedField}`).subscribe(
      (res: any) => {
        this.subjects = res.subjects; // Assign the subjects directly
      },
      (error: any) => {
        // Error handling logic
        console.error('An error occurred:', error.message);
      }
    );
  }

  onFileChange(event:Event) {
    const inputElement = event.target as HTMLInputElement;
    const file = (inputElement?.files && inputElement.files[0]) || null;
  
    this.fileUploadForm.patchValue({
      file: file
    });
  
    const fileControl = this.fileUploadForm.get('file');
    if (fileControl) {
      fileControl.updateValueAndValidity();
    }
  }

  onSubmit() {
    if (this.fileUploadForm.valid) {
      const formData = new FormData();
      formData.append('name', this.fileUploadForm.get('fileName')!.value);
    formData.append('desc', this.fileUploadForm.get('description')!.value);
    //formData.append('field', this.fileUploadForm.get('field')!.value);
    formData.append('subject', this.fileUploadForm.get('subject')!.value);
    formData.append('file', this.fileUploadForm.get('file')!.value);
      // Make a POST API call
      this.apiService.post('/user/add-document', formData).subscribe(response => {
        console.log('API Response:', response);
        // Handle the response as needed
      });
    }
  }
  }
