import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-clinic-search',
  templateUrl: './clinic-search.component.html',
  styleUrls: ['./clinic-search.component.css']
})
export class ClinicSearchComponent {

  selectedSpeciality: string | null = null;;
  selectedArea: string | null = null;;
  selectedCity: string | null = null;;
  doctorName:string | null = null;;
  specialties: any[] =[]
  cities: any[] = []
  Areas: any[] = [];
  constructor(private _http:HttpClient){
    console.log(this.specialties);
  }
  ngOnInit(): void {

    this.getAllSpecialties();
    this.getAllAreas();
    this.getAllCities();
  }

  getAllSpecialties():void{
    this._http.get<any>("http://localhost:9999/api/doctorSpecs/all")
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
    this._http.get<any>("http://localhost:9999/api/areas/all")
    .subscribe(
      {
        next:response=>{
          this.Areas = response;
          console.log(response);
        },
        error:error=>{}
      }
    );
  }
  getAllCities():void{
    this._http.get<any>("http://localhost:9999/api/cities/all")
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
  getSearchResult(){
    
  }
}
