import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/common-service/api.service';

@Component({
  selector: 'app-my-documents',
  templateUrl: './my-documents.component.html',
  styleUrls: ['./my-documents.component.css']
})
export class MyDocumentsComponent implements OnInit {
  result:any;
  ngOnInit(): void {
    this.getDocuments()
  }

  constructor(private apiService:ApiService){

  }
  getDocuments():void{
    this.result =[]
    this.apiService.get('/user/get-documents').subscribe((res:any)=>{
      if(res){
        this.result= res.result
      }
    })
  }
  deleteDocument(id:string):void{
    this.apiService.delete(`/user/delete-document/${id}`).subscribe((res:any)=>{
      if(res){
        this.getDocuments();
      }
    })
  }
}
