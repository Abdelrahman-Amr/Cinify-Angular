  import { Injectable } from '@angular/core';
  import {Observable} from "rxjs";
  import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
  import {DoctorModel} from "../model/doctor-model";
  import {Constants} from "../constatnts";
  import {MessageResponse} from "../model/message-response";
  import {PageResult} from "../model/page-result";
  import {DoctorTitleModel} from "../model/doctor-title-model";
  import {ClinicModel} from "../model/clinic-model";

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
