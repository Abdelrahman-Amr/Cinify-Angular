  import { Injectable } from '@angular/core';
  import {Observable} from "rxjs";
  import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import { ClinicModel } from '../model/clinic-model';
import { Constants } from '../constatnts';
  import {PatientModel} from "../model/patient-model";
  import {AreaModel} from "../model/area-model";


  @Injectable({
    providedIn: 'root'
  })
  export class AreaService {

    constructor(private httpClient: HttpClient) { }
    getAreaByCity(cityId:number): Observable < AreaModel[] > {
      return this.httpClient.get<AreaModel[]>(Constants.getAreaByCityUrl+cityId,{
      });
    }



  }
