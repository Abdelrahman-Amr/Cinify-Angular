import { Injectable } from '@angular/core';
import { PatientModel } from '../model/patient-model';
import { HttpClient } from '@angular/common/http';
import { Constants } from '../constatnts';
import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';

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
  minAge(minAge: number, errorMessage: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const birthDate = new Date(control.value);
      const currentDate = new Date();
  
      const diffYears = currentDate.getFullYear() - birthDate.getFullYear();
      const diffMonths = currentDate.getMonth() - birthDate.getMonth();
      const diffDays = currentDate.getDate() - birthDate.getDate();
  
      if (diffYears < minAge || (diffYears === minAge && diffMonths < 0) || (diffYears === minAge && diffMonths === 0 && diffDays < 0)) {
        return { 'minAge': { message: errorMessage } };
      }
  
      return null;
    };
  }
}
