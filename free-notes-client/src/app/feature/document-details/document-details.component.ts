import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { ApiService } from 'src/app/common-service/api.service'
@Component({
  selector: 'app-document-details',
  templateUrl: './document-details.component.html',
  styleUrls: ['./document-details.component.css'],
})
export class DocumentDetailsComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService
  ) {}
  documentId: string = ''
  likes: any[] = []
  totalLikes: number = 0
  reviews: any[] = []
  ratings: any[] = []
  avgRating: number = 0
  document: any
  ngOnInit() {
    // Retrieve parameters from URL
    this.route.queryParams.subscribe((params) => {
      this.documentId = params['documentId']
      this.getLikes(this.documentId)
      this.getReviews(this.documentId)
      this.getRating(this.documentId)
      this.getDocument(this.documentId)
    })
  }

  getLikes(documentId: string) {
    this.apiService.get(`/documentLike/${documentId}`).subscribe((res) => {
      this.likes = res.result
      this.totalLikes = res.count
    })
  }
  getReviews(documentId: string) {
    this.apiService.get(`/get-reviews/${documentId}`).subscribe((res) => {
      this.reviews = res.result
    })
  }
  getRating(documentId: string) {
    this.apiService.get(`/get-ratings/${documentId}`).subscribe((res) => {
      this.ratings = res.result
      this.avgRating = res.avgRating[0].avgRating
    })
  }
  getDocument(documentId: string) {
    this.apiService.get(`/document/${documentId}`).subscribe((res) => {
      this.document = res.result
    })
  }
}
