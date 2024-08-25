import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { ApiService } from 'src/app/common-service/api.service'
import { LocalStorageService } from 'src/app/common-service/local-storage.service'
import { WebsocketService } from 'src/app/common-service/websocket.service'

@Component({
  selector: 'app-chat-personal',
  templateUrl: './chat-personal.component.html',
  styleUrls: ['./chat-personal.component.css'],
})
export class ChatPersonalComponent implements OnInit {
  messages: any[] = []
  newMessage: string = ''
  userId: string = ''
  userProfile: any
  userName: string = ''
  sender: string = ''

  constructor(
    private route: ActivatedRoute,
    private websocketService: WebsocketService,
    private apiService: ApiService,
    private localStorage: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id') || ''
    this.getChatProfile()
    const user = JSON.parse(this.localStorage.getData('user')) || ''
    console.log(user)
    this.userName = `${user.firstName} ${user.lastName}`
    this.sender = user._id
    const token = localStorage.getItem('token') || ''
    this.websocketService.connect(token)
    this.websocketService.fetchInitialMessages(this.userId).subscribe((res) => {
      if (res.status === 200) {
        console.log(res.result)
        this.messages = res.result
      }
    })

    this.websocketService.getMessages().subscribe((messages) => {
      console.log('recevied')
      this.messages = messages
    })
  }

  getChatProfile() {
    this.apiService.get(`/get-user/${this.userId}`).subscribe((res) => {
      if (res.status === 200) {
        this.userProfile = res.result
      }
    })
  }

  sendMessage(): void {
    const message = {
      sender: this.sender,
      senderName: this.userName,
      type: 'private',
      content: this.newMessage,
      receiverId: this.userId,
    }
    this.websocketService.sendMessage(message)
    this.messages.push(message)
    this.newMessage = ''
  }
}
