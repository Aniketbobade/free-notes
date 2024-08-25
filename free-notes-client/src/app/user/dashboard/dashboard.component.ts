import { Component, OnInit } from '@angular/core'
import { LocalStorageService } from 'src/app/common-service/local-storage.service'
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { Router } from '@angular/router'
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  userName: string = ''
  constructor(
    private storage: LocalStorageService,
    private http: HttpClient,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.getUser()
  }
  getUser(): void {
    let user = this.storage.getData('user')
    user = user ? JSON.parse(user) : null
    console.log('user', user)
    if (!user) {
      this.router.navigate(['/login'])
    }
    console.log(`${user.firstName} ${user.lastName}`)
    this.userName = `${user.firstName} ${user.lastName}`
  }
  logout(): void {
    this.storage.clearStorage()
    this.router.navigate(['/'])
  }
}
