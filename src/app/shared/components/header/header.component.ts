import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  selectedCountry: string = 'Egypt';
  isNavbarCollapsed = true;
  isDropdownOpen = false



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
  
}
