import { Injectable } from '@angular/core';
import { WebSocketSubject } from 'rxjs/webSocket';
import { BehaviorSubject, catchError, EMPTY, map, Observable, Observer } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ApiService } from './api.service';
import { AnonymousSubject } from 'rxjs/internal/Subject';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private socket$: WebSocketSubject<any> | undefined;
  private messagesSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  public messages$: Observable<any[]> = this.messagesSubject.asObservable();

  constructor(private apiService: ApiService) {}
  
  private createWebSocketConnection(token: string): Observable<WebSocketSubject<any>> {
    return new Observable((observer: Observer<any>) => {
      if (!this.socket$ || this.socket$.closed) {
        this.socket$ = new WebSocketSubject(`ws://103.127.31.207:3000?token=${token}`);
        this.socket$.pipe(
          map(message => [...this.messagesSubject.getValue(), message]),
          catchError(error => {
            console.error('WebSocket error:', error);
            return EMPTY;
          })
        ).subscribe(observer);
      } else {
        observer.complete();
      }
    });
  }

  public connect(token: string): void {
    this.createWebSocketConnection(token)
      .subscribe(() => console.log('WebSocket connection established'));
  }

  public sendMessage(message: any): void {
    if (this.socket$) {
      this.socket$.next(message);
    }
  }

  public getMessages(): Observable<any[]> {
    console.log("Message received ")
    return this.messages$;
  }

  public fetchInitialMessages(userId: string): Observable<any> {
    return this.apiService.get(`/user/messages/${userId}`) // Type casting with generics
      .pipe(
        catchError(error => {
          console.error('Error fetching initial messages:', error);
          return EMPTY; // Handle errors gracefully (e.g., throw a custom error)
        })
      );
  }
}
