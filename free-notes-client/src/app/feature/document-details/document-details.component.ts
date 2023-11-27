import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-document-details',
  templateUrl: './document-details.component.html',
  styleUrls: ['./document-details.component.css']
})
export class DocumentDetailsComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }


  ngOnInit() {
    // Retrieve parameters from URL
    this.route.queryParams.subscribe(params => {
      const documentId  = params['documentId'];
     
      console.log('ID:',documentId );
    });
  }
}
