  import { Injectable } from '@angular/core';
  import {Observable} from "rxjs";
  import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import { ClinicModel } from '../components/header/model/clinic-model';
import { Constants } from '../constatnts';


  @Injectable({
    providedIn: 'root'
  })
  export class ClinicService {

    constructor(private httpClient: HttpClient) { }
    getAllClinics(): Observable < ClinicModel[] > {
      return this.httpClient.get<ClinicModel[]>(Constants.getAllClinicsUrl,{
      });
    }


  }
