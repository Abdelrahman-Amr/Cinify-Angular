import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {DoctorModel} from "../model/doctor-model";
import {Constants} from "../constatnts";
import {PageResult} from "../model/page-result";
import {MessageResponse} from "../model/message-response";
import {PatientModel} from "../model/patient-model";

@Injectable({
  providedIn: 'root'
})
export class PatientService {


  constructor(private httpClient: HttpClient) { }

  addPatient(patient: PatientModel): Observable < PatientModel > {
    return this.httpClient.post<PatientModel>(Constants.addPatientUrl, patient);
  }

}
