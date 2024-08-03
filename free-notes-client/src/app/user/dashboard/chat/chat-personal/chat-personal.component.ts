import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/common-service/api.service';
import { WebsocketService } from 'src/app/common-service/websocket.service';

@Component({
  selector: 'app-chat-personal',
  templateUrl: './chat-personal.component.html',
  styleUrls: ['./chat-personal.component.css']
})
export class ChatPersonalComponent implements OnInit {
  messages: any[] = [];
  newMessage: string = '';
  userId: string="";
  userProfile:any;

  constructor(private route: ActivatedRoute, private websocketService: WebsocketService,private apiService:ApiService) {}

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id') || ''; // Ensure userId is a string
    this.getChatProfile()
    const token = localStorage.getItem('token') || ''
    this.websocketService.connect(token);
    this.websocketService.fetchInitialMessages(this.userId).subscribe((res) => {
      console.log(res)
      if(res.status=== 200){
        this.messages = res.result;
      }
    });

    this.websocketService.getMessages().subscribe((messages) => {
      this.messages = [...this.messages, ...messages];
    });
  }

  getChatProfile(){
    console.log(this.userId)
    this.apiService.get(`/get-user/${this.userId}`).subscribe((res)=>{
      if(res.status===200){
        this.userProfile=res.result
      }       
    },
  )
  }
  sendMessage(): void {
    const message = {
      type: 'private',
      content: this.newMessage,
      receiverId: this.userId
    };
    this.messages = [...this.messages, message]; // Update the array
    this.websocketService.sendMessage(message);
    this.newMessage = '';
  }
}
