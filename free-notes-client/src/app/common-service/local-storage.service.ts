import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  setData<T>(key: string, data: string): void {
    // const jsonData = JSON.stringify(data);
    localStorage.setItem(key, data)
  }
  getData<T>(key: string): any {
    return localStorage.getItem(key)
  }
  clearStorage(): void {
    localStorage.clear()
  }
}
