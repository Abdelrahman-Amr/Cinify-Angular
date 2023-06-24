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
  isClinic=false;
  loginSub:Subscription;
  logoutSub:Subscription;
  user:any;
  fullName:string;


  constructor(private securityService:SecurityService, private router:Router,
              ) {
  }
  ngOnInit(): void {
    this.loginSub = this.securityService.loginSubject.subscribe(value => {
      this.isLoggedIn=true;
      // @ts-ignore
      this.user=JSON.parse(localStorage.getItem('user'));
      if(this.securityService.isClinic()){
        console.log(this.securityService.isClinic());
        this.isClinic=true;
      }else{
        // this.fullName=this.user.fullName;
      }
    });
    this.logoutSub = this.securityService.logoutSubject.subscribe(value => {
      this.isLoggedIn=false;
      this.isClinic=false;

    });
    if(this.securityService.isLoggedIn()){
      this.isLoggedIn=true;
    }
    if(this.securityService.isClinic()){
      this.isClinic=true;
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
