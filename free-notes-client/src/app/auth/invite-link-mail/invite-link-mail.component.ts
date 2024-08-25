import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-invite-link-mail',
  templateUrl: './invite-link-mail.component.html',
  styleUrls: ['./invite-link-mail.component.css'],
})
export class InviteLinkMailComponent implements OnInit {
  constructor(private route: ActivatedRoute) {}
  userMail!: string
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.userMail = params['userMail']
    })
  }
}
