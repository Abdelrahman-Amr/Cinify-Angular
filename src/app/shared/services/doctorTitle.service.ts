  import { Injectable } from '@angular/core';
  import {Observable} from "rxjs";
  import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
  import {DoctorModel} from "../model/doctor-model";
  import {Constants} from "../constatnts";
  import {MessageResponse} from "../model/message-response";
  import {PageResult} from "../model/page-result";
  import {DoctorTitleModel} from "../model/doctor-title-model";

  @Injectable({
    providedIn: 'root'
  })
  export class DoctorTitleService {

    constructor(private httpClient: HttpClient) { }
    getAllDoctorTitles(): Observable < DoctorTitleModel[] > {
      return this.httpClient.get<DoctorTitleModel[]>(Constants.getAllDoctorTitlesUrl,{
      });
    }
    getDoctorTitle(doctorTitleId:number): Observable < DoctorTitleModel > {
      return this.httpClient.get<DoctorTitleModel>(Constants.getDoctorTitle+doctorTitleId,{
      });
    }
    deleteDoctorTitle(doctorTitleId:number): Observable < MessageResponse > {
      return this.httpClient.delete<MessageResponse>(Constants.deleteDoctorTitleUrl+doctorTitleId);
    }
    addDoctorTitle(doctorTitle: DoctorTitleModel): Observable < MessageResponse > {
      return this.httpClient.post<MessageResponse>(Constants.addDoctorTitleURL, doctorTitle);
    }
    updateDoctorTitle(doctorTitle: DoctorTitleModel): Observable < MessageResponse > {
      return this.httpClient.put<MessageResponse>(Constants.updateDoctorTitleURL+doctorTitle.id, doctorTitle);
    }
  }
