import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SearchResultService } from './search-result-service.service';
import { Constants } from '../constatnts';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  selectedSpeciality: any | null = null;
  selectedArea: any | null = null;
  selectedCity: any | null = null;
  doctorName: string| null = null;
  sortType: string| null = null;
  order: string| null = null;
  constructor(private router: Router,private searchResult:SearchResultService,private _http:HttpClient) { }

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
    this._http.get<any>(`${Constants.getDoctor}${specialityId}/${cityId}/${areaId}?page=1&limit=10&clinicName=${this.doctorName}&sortType=${this.sortType}&order=${this.order}`)
    .subscribe(
      {
        next:response=>{
          this.searchResult.doctorsSearchResult = response.data;
          this.searchResult.doctorsSubject.next(response);

        },
        error:error=>{}
      }
    );
  }
}
