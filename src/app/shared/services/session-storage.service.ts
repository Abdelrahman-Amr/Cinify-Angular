import { Injectable } from '@angular/core';
import { ClinicModel } from '../components/header/model/clinic-model';
import { DoctorSpecializationModel } from '../components/header/model/doctor-specialization-model';
import { DoctorTitleModel } from '../components/header/model/doctor-title-model';


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
