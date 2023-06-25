import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Constants } from 'src/app/shared/constatnts';
import { SearchResultService } from 'src/app/shared/services/search-result-service.service';
import {SessionStorageService} from "../../../shared/services/session-storage.service";
import { FilterService } from 'src/app/shared/services/filter.service';

@Component({
  selector: 'app-clinic-search',
  templateUrl: './clinic-search.component.html',
  styleUrls: ['./clinic-search.component.css']
})
export class ClinicSearchComponent {
  specialties: any[] =[]
  cities: any[] = []
  areas: any[] = [];
  filteredAreas:any[]=[]

  sortTypes: { label: string, value: any, order:string }[] = [
    { label: 'Price High To Low', value: 'ticketPrice', order: 'DESC' },
    { label: 'Price Low To High', value: 'ticketPrice', order:'ASC' },
    { label: 'Rating', value: 'averageRating', order:'DESC' }
  ];

  constructor(private _http:HttpClient,private searchResult: SearchResultService,
     private sessionStorageService:SessionStorageService,public filter:FilterService){
    console.log(this.specialties);
  }
  ngOnInit(): void {

    this.getAllSpecialties();
    this.getAllAreas();
    this.getAllCities();
    
    // this.getAllCities();
    this.cities = this.sessionStorageService.getCities();
  }

  getAllSpecialties():void{
    this._http.get<any>(Constants.getAllDoctorSpecsUrl)
    .subscribe(
      {
        next:response=>{
          this.specialties = response;
          // console.log(response);
        },
        error:error=>{}
      }
    );
  }
  getAllAreas():void{
    this._http.get<any>(Constants.getAllAreasUrl)
    .subscribe(
      {
        next:response=>{
          this.areas = response;
          // this.filteredAreas=this.areas;
          // console.log(response);
        },
        error:error=>{}
      }
    );
  }
  getAllCities():void{
    this._http.get<any>(Constants.getAllCities)
    .subscribe(
      {
        next:response=>{
          this.cities = response;
          // console.log(response);
        },
        error:error=>{}
      }
    );
  }

  onCitySelectionChange(selectedCity: any): void {
    this.filteredAreas = this.areas.filter(area => area.city.name === selectedCity.name);
  }

 

}
