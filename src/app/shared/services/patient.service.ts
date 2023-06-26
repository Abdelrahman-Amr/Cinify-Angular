import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {DoctorModel} from "../model/doctor-model";
import {Constants} from "../constatnts";
import {PageResult} from "../model/page-result";
import {MessageResponse} from "../model/message-response";
import {PatientModel} from "../model/patient-model";
import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor(private _http:HttpClient) { }

  updatePatientProfile(patient:PatientModel):Observable<MessageResponse>{
    return this._http.put<MessageResponse>(Constants.updatePatient,patient);

  }
  changePassword(patient:PatientModel){
    this._http.put<any>(Constants.changePassword,patient).subscribe();

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


  addPatient(patient: PatientModel): Observable < PatientModel > {
    return this._http.post<PatientModel>(Constants.addPatientUrl, patient);
  }

}
