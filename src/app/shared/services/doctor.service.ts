  import { Injectable } from '@angular/core';
  import {Observable} from "rxjs";
  import {HttpClient, HttpParams} from "@angular/common/http";
  import {DoctorModel} from "../model/doctor-model";
  import {Constants} from "../constatnts";
  import {MessageResponse} from "../model/message-response";
  import {PageResult} from "../model/page-result";

  @Injectable({
    providedIn: 'root'
  })
  export class DoctorService {

    constructor(private httpClient: HttpClient) { }
    getAllDoctors(): Observable < DoctorModel[] > {
      return this.httpClient.get<DoctorModel[]>(Constants.getAllDoctorsUrl,{
      });
    }

    getDoctorsPage(page:number = 1, limit:number = 5): Observable < PageResult<DoctorModel>> {
      let pageParams = new HttpParams();
      pageParams = pageParams.append('page',page);
      pageParams = pageParams.append('limit',limit);
      return this.httpClient.get<PageResult<DoctorModel>>(Constants.getDoctorsPageUrl,{
        params:pageParams
      });
    }

    getDoctorsPageByClinic(page:number = 1, limit:number = 5, clinicId:number): Observable < PageResult<DoctorModel>> {
      let pageParams = new HttpParams();
      pageParams = pageParams.append('page',page);
      pageParams = pageParams.append('limit',limit);
      return this.httpClient.get<PageResult<DoctorModel>>(Constants.getDoctorsPageByClinicUrl+clinicId,{
        params:pageParams
      });
    }
    getDoctor(doctorId:number): Observable < DoctorModel > {
      return this.httpClient.get<DoctorModel>(Constants.getDoctor+doctorId,{
      });
    }
    deleteDoctor(doctorId:number): Observable < MessageResponse > {
      return this.httpClient.delete<MessageResponse>(Constants.deleteDoctorUrl+doctorId);
    }
    addDoctor(city: DoctorModel): Observable < MessageResponse > {
      return this.httpClient.post<MessageResponse>(Constants.addDoctorURL, city);
    }
    updateDoctor(doctor: DoctorModel): Observable < MessageResponse > {
      return this.httpClient.put<MessageResponse>(Constants.updateDoctorURL, doctor);
    }

    upload(selectedFile: File, name: string): Observable<MessageResponse> {
      console.log("upload",name);
      const uploadImageData = new FormData();
      console.log(selectedFile);
      uploadImageData.append('file', selectedFile, name);
      return this.httpClient.post<MessageResponse>(Constants.uploadDoctorImgUrl, uploadImageData, {
      });
    }
  }
