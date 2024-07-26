import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  constructor(private route: ActivatedRoute, private websocketService: WebsocketService) {}

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id') || ''; // Ensure userId is a string
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
