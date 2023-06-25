import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UpdateProfileService {

  isActive: string ;
  constructor(private router: Router) { }

  navigateToProfile() {
    this.isActive = 'profile';
    this.router.navigate(['/profile']);
  }
  
  navigateToChangePassword() {
    this.isActive = 'changePassword';
    this.router.navigate(['/changePassword']);
  }
}
