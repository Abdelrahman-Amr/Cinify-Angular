import { Injectable } from '@angular/core';
import { PatientModel } from '../model/patient-model';
import { HttpClient } from '@angular/common/http';
import { Constants } from '../constatnts';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor(private _http:HttpClient) { }

  updatePatientProfile(patient:PatientModel){
    this._http.put<any>(Constants.updatePatientProfile,patient)
  
  .subscribe(
    {
      next:response=>{
        // console.log(this.student.Age);
        alert(response.Message);
      },
      error:error=>{}
    }
  );

  }
}
