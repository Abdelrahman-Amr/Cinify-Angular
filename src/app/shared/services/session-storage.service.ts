import { Injectable } from '@angular/core';
import { ClinicModel } from '../model/clinic-model';
import { DoctorSpecializationModel } from '../model/doctor-specialization-model';
import { DoctorTitleModel } from '../model/doctor-title-model';
import {CityModel} from "../model/city-model";


@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {

  constructor() { }

  setTitles(titles:DoctorTitleModel[]){
    sessionStorage.setItem('titles',JSON.stringify(titles));
  }
  setSpecs(specs:DoctorSpecializationModel[]){
    sessionStorage.setItem('specs',JSON.stringify(specs));
  }

  setClinics(clinics:ClinicModel[]){
    sessionStorage.setItem('clinics',JSON.stringify(clinics));
  }

  setCities(cities:CityModel[]){
    sessionStorage.setItem('cities',JSON.stringify(cities));
  }

  getCities():CityModel[]{
    // @ts-ignore
    return JSON.parse(sessionStorage.getItem('cities'));
  }

  getTitles(): DoctorTitleModel[]{
    // @ts-ignore
    return JSON.parse(sessionStorage.getItem('titles'));
  }
  getSpecs(): DoctorSpecializationModel[]{
    // @ts-ignore
    return JSON.parse(sessionStorage.getItem('specs'));
  }

  getClinics(): ClinicModel[]{
    // @ts-ignore
    return JSON.parse(sessionStorage.getItem('clinics'));
  }

}
