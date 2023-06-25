import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {DoctorTitleModel} from "../model/doctor-title-model";
import {Constants} from "../constatnts";
import {CityModel} from "../model/city-model";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CityService {

  constructor(private httpClient:HttpClient) { }

  getAllCities(): Observable < CityModel[] > {
    return this.httpClient.get<CityModel[]>(Constants.getAllCities,{
    });
  }
}
