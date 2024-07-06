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
  subjects: any[] = [];
  fields: any[] = [];
  selectedFile: File | null = null;

  constructor(
    private apiService: ApiService,
    private formBuilder: FormBuilder,
    private http: HttpClient
  ) {
    this.fileUploadForm = this.formBuilder.group({
      fileName: ['', Validators.required],
      description: ['', Validators.required],
      field: ['', Validators.required],
      subject: ['', Validators.required],
      document: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadFields();
  }

  loadFields() {
    this.apiService.get('/get-fields').subscribe((res: any) => {
      this.fields = res;
    });
  }

  onFieldChange() {
    this.selectedField = this.fileUploadForm.get('field')?.value;
    this.apiService.get(`/get-subjects?fieldId=${this.selectedField}`).subscribe(
      (res: any) => {
        this.subjects = res.subjects;
      },
      (error: any) => {
        console.error('An error occurred:', error.message);
      }
    );
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      this.fileUploadForm.patchValue({ document: this.selectedFile });
      this.fileUploadForm.get('document')!.updateValueAndValidity();
    }
  }

  onSubmit() {
    if (this.fileUploadForm.valid && this.selectedFile) {
      const formData = new FormData();
      formData.append('name', this.fileUploadForm.get('fileName')!.value);
      formData.append('desc', this.fileUploadForm.get('description')!.value);
      formData.append('field', this.fileUploadForm.get('field')!.value);
      formData.append('subject', this.fileUploadForm.get('subject')!.value);
      formData.append('document', this.selectedFile);

      this.apiService.fileUpload('/user/add-document', formData, true).subscribe(response => {
        console.log('API Response:', response);
      });
    } else {
      console.log('Form is invalid:', this.fileUploadForm.errors);
    }
  }  
}
