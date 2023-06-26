  import { Injectable } from '@angular/core';
  import {Observable} from "rxjs";
  import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import { ClinicModel } from '../model/clinic-model';
import { Constants } from '../constatnts';
  import {PatientModel} from "../model/patient-model";


  @Injectable({
    providedIn: 'root'
  })
  export class ClinicService {
    clinicModel:ClinicModel;
    constructor(private httpClient: HttpClient) { }
    getAllClinics(): Observable < ClinicModel[] > {
      return this.httpClient.get<ClinicModel[]>(Constants.getAllClinicsUrl,{
      });
    }

    addClinic(clinic: ClinicModel): Observable < ClinicModel > {
      return this.httpClient.post<ClinicModel>(Constants.addClinictUrl, clinic);
    }
    getClinicById(id:number) :Observable < ClinicModel >{
      return this.httpClient.get<ClinicModel>(Constants.getClinicURL+`${id}`);
    }
  }
