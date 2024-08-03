import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocalStorageService } from './local-storage.service';
import { environment } from "../../environments/environment";
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  //private apiBaseUrl: string = 'https://free-notes-app.onrender.com/api'; // Replace with your API base URL
  private apiBaseUrl: string = environment.apiBaseUrl; // Replace with your API base URL
  constructor(
    private http: HttpClient,
    private localStorage: LocalStorageService
  ) {}
  token: string = '';
  // GET request
  get(endpoint: string, params?: any): Observable<any> {
    this.token= this.localStorage.getData("token")
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });

    const url = `${this.apiBaseUrl}${endpoint}`;

    return this.http.get(url, {
      headers: headers,
      params: new HttpParams({ fromObject: params })
    });
  }

  // POST request
  post(
    endpoint: string,
    body: any,
    isFormData: boolean = false
  ): Observable<any> {
    this.token = this.localStorage.getData('token');
    const url = `${this.apiBaseUrl}${endpoint}`;
    let headers;
    if (isFormData) {
      headers = new HttpHeaders({ Authorization: `Bearer ${this.token}` });
    } else {
      headers = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.token}`,
      });
    }
    return this.http.post(url, body, { headers });
  }

  // PUT request
  put(endpoint: string, body: any): Observable<any> {
    const url = `${this.apiBaseUrl}${endpoint}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`,
    });
    return this.http.put(url, body, { headers });
  }

  // DELETE request
  delete(endpoint: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });
    const url = `${this.apiBaseUrl}${endpoint}`;
    return this.http.delete(url,{headers});
  }

  fileUpload(endpoint: string, body: FormData, isFormData: boolean): Observable<any> {
    const url = `${this.apiBaseUrl}${endpoint}`;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
      // Remove the content-type header here to let the browser set it correctly
    });

    return this.http.post(url, body, { headers });
  }
}
