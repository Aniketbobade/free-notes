import { Injectable } from '@angular/core'
import { WebSocketSubject } from 'rxjs/webSocket'
import {
  BehaviorSubject,
  catchError,
  EMPTY,
  map,
  Observable,
  Observer,
} from 'rxjs'
import { ApiService } from './api.service'
import { environment } from '../../environments/environment'
@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  private socket$: WebSocketSubject<any> | undefined
  private messagesSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>(
    []
  )
  public messages$: Observable<any[]> = this.messagesSubject.asObservable()

  constructor(private apiService: ApiService) {}

  private createWebSocketConnection(token: string): void {
    if (!this.socket$ || this.socket$.closed) {
      this.socket$ = new WebSocketSubject(
        `${environment.chatApiUrl}?token=${token}`
      )
      this.socket$
        .pipe(
          map((message) => [...this.messagesSubject.getValue(), message]),
          catchError((error) => {
            console.error('WebSocket error:', error)
            return EMPTY
          })
        )
        .subscribe((messages: any[]) => {
          this.messagesSubject.next(messages)
        })
    }
  }

  public connect(token: string): void {
    this.createWebSocketConnection(token)
    console.log('WebSocket connection established')
  }

  public sendMessage(message: any): void {
    if (this.socket$) {
      this.socket$.next(message)
    }
  }

  public getMessages(): Observable<any[]> {
    return this.messages$
  }

  public fetchInitialMessages(userId: string): Observable<any> {
    return this.apiService.get(`/user/messages/${userId}`).pipe(
      catchError((error) => {
        console.error('Error fetching initial messages:', error)
        return EMPTY
      })
    )
  }
}
