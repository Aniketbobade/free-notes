import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LocalStorageService } from 'src/app/common-service/local-storage.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private localStorage:LocalStorageService , private router: Router) {}

  canActivate(): boolean {
    if (this.localStorage.getData("token")) {
      return true; // User is logged in, allow access
    } else {
      this.router.navigate(['/login']); // Redirect to login page if not logged in
      return false;
    }
  }
}
