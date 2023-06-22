import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Constants } from 'src/app/shared/constatnts';
import { SearchResultService } from 'src/app/shared/services/search-result-service.service';

@Component({
  selector: 'app-clinic-search',
  templateUrl: './clinic-search.component.html',
  styleUrls: ['./clinic-search.component.css']
})
export class ClinicSearchComponent {

  selectedSpeciality: any | null = null;
  selectedArea: any | null = null;
  selectedCity: any | null = null;
  doctorName: string| null = null;
  flag=false;
  specialties: any[] =[]
  cities: any[] = []
  areas: any[] = [];
  filteredAreas:any[]=[]
  constructor(private _http:HttpClient,private router: Router,private searchResult: SearchResultService){
    console.log(this.specialties);
  }
  ngOnInit(): void {

    this.getAllSpecialties();
    this.getAllAreas();
    this.getAllCities();
  }

  getAllSpecialties():void{
    this._http.get<any>(Constants.getAllDoctorSpecsUrl)
    .subscribe(
      {
        next:response=>{
          this.specialties = response;
          console.log(response);
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
          console.log(response);
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
          console.log(response);  
        },
        error:error=>{}
      }
    );
  }
  getSearchResult():void{
    let specialityId=null;
    let cityId=null;
    let areaId=null;
    if(this.selectedSpeciality!==null){
      specialityId=this.selectedSpeciality.id;
    }
    if(this.selectedCity!==null){
      cityId=this.selectedCity.id;
    }
    if(this.selectedArea!==null){
      areaId=this.selectedArea.id;
    }
    this._http.get<any>(`${Constants.getDoctor}${specialityId}/${cityId}/${areaId}?page=1&limit=10&clinicName=${this.doctorName}`)
    .subscribe(
      {
        next:response=>{
          this.searchResult.doctorsSearchResult = response.data;
            
        },
        error:error=>{}
      }
    );
  }
  submitSearchbutton(){
    let selectedAreaOrCity: String="Egypt";
    let speciality="All Specialities";
    if (this.selectedSpeciality !== null) {
      speciality=this.selectedSpeciality.name;
    }
    if(this.selectedArea!==null){
      selectedAreaOrCity=this.selectedArea.name;
    }
    else{
      if(this.selectedCity!==null){
        selectedAreaOrCity=this.selectedCity.name;
      }
    }
    if (this.doctorName !== null) {
      this.router.navigate(['doctor', speciality, selectedAreaOrCity], { queryParams: { doctorName: this.doctorName } });
    } else {
      this.router.navigate(['doctor', speciality, selectedAreaOrCity]);
    }
    this.getSearchResult();
    console.log(this.searchResult.doctorsSearchResult);
    
  }
  onCitySelectionChange(selectedCity: any): void {
    this.filteredAreas = this.areas.filter(area => area.city.name === selectedCity.name);
  }
  

}
