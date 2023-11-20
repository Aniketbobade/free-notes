import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocalStorageService } from './local-storage.service';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiBaseUrl: string = 'http://15.206.209.204:3000/api'; // Replace with your API base URL

  constructor(private http: HttpClient,private localStorage: LocalStorageService) {}
  token:string="";
  // GET request
  get(endpoint: string, params?: any): Observable<any> {
    this.token = this.localStorage.getData('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`,
    });
    const url = `${this.apiBaseUrl}${endpoint}`;
    return this.http.get(url, { params: new HttpParams({ fromObject: params }) });
  }

  // POST request
  post(endpoint: string, body: any): Observable<any> {
    this.token = this.localStorage.getData('token');
    const url = `${this.apiBaseUrl}${endpoint}`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': `Bearer ${this.token}` });
    return this.http.post(url, body, { headers });
  }

  // PUT request
  put(endpoint: string, body: any): Observable<any> {
    const url = `${this.apiBaseUrl}${endpoint}`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': `Bearer ${this.token}` });
    return this.http.put(url, body, { headers });
  }

  // DELETE request
  delete(endpoint: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`,
    });
    const url = `${this.apiBaseUrl}${endpoint}`;
    return this.http.delete(url);
  }
}
