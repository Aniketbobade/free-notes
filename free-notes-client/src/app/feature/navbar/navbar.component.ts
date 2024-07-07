import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/common-service/local-storage.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  constructor(private storage:LocalStorageService){
    
  }

  checkLoggedIn():boolean{
    const token= this.storage.getData('token')
    if(token){
      return true;
    }else{
      return false;
    }
  }
}
