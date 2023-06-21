import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {DoctorTitleModel} from "../model/doctor-title-model";
import {Constants} from "../constatnts";
import {MessageResponse} from "../model/message-response";
import {DoctorSpecializationModel} from "../model/doctor-specialization-model";

@Injectable({
  providedIn: 'root'
})
export class DoctorSpecializationService {

  constructor(private httpClient: HttpClient) {
  }

  getAllDoctorSpecs(): Observable<DoctorSpecializationModel[]> {
    return this.httpClient.get<DoctorSpecializationModel[]>(Constants.getAllDoctorSpecsUrl, {});
  }


}
