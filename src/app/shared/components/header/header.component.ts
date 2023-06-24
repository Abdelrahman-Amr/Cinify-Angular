import {Component, OnDestroy, OnInit} from '@angular/core';
import {SecurityService} from "../../services/security.service";
import {Router} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy{
  selectedCountry: string = 'Egypt';
  isNavbarCollapsed = true;
  isDropdownOpen = false
  isLoggedIn=false;
  loginSub:Subscription;
  logoutSub:Subscription;


  constructor(private securityService:SecurityService, private router:Router) {
  }
  ngOnInit(): void {
    this.loginSub = this.securityService.loginSubject.subscribe(value => {
      this.isLoggedIn=true;
    });
    this.logoutSub = this.securityService.logoutSubject.subscribe(value => {
      this.isLoggedIn=false;
    });

    console.log(this.securityService.isLoggedIn())
    if(this.securityService.isLoggedIn()){
      this.isLoggedIn=true;
    }
  }

  selectCountry(country: string): void {
    this.selectedCountry = country;
  }
  countryFlagMap: Map<string, string> = new Map([
    ['US', 'flag-icon-us'],
    ['UK', 'flag-icon-gb'],
    ['Egypt','flag-icon-eg']
    // Add more mappings as needed
  ]);
  getSelectCountry(){
    return this.selectedCountry;
  }

  collapse(){
    this.isNavbarCollapsed=true;
  }

logout(){
    this.securityService.logout();
    this.isNavbarCollapsed=true;
    this.isLoggedIn=false;
    this.router.navigate(['/']);



}

  ngOnDestroy(): void {
    this.loginSub.unsubscribe();
    this.logoutSub.unsubscribe();
  }

}
