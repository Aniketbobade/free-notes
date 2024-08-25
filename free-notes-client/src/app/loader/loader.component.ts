import { Component, OnInit } from '@angular/core'
import { Observable } from 'rxjs'
import { LoadingService } from '../common-service/loading.service'

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css'],
})
export class LoaderComponent implements OnInit {
  loading$: Observable<boolean>

  constructor(private loadingService: LoadingService) {
    this.loading$ = this.loadingService.loading$
  }

  ngOnInit(): void {}
}
