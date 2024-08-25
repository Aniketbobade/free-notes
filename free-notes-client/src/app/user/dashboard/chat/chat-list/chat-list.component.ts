import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { ApiService } from 'src/app/common-service/api.service'
@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.css'],
})
export class ChatListComponent implements OnInit {
  chats: any = []
  constructor(
    private router: Router,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.apiService.get('/user-list').subscribe((res: any) => {
      if (res.status === 200) {
        this.chats = res.result
      }
    })
  }
  selectChat(chat: any): void {
    this.router.navigate(['/dashboard/chat', chat._id])
  }
}
