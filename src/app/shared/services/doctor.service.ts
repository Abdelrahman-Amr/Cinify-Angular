  import { Injectable } from '@angular/core';
  import {Observable} from "rxjs";
  import {HttpClient, HttpParams} from "@angular/common/http";
  import {DoctorModel} from "../components/header/model/doctor-model";
  import {Constants} from "../constatnts";
  import {MessageResponse} from "../components/header/model/message-response";
  import {PageResult} from "../components/header/model/page-result";

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
      const uploadImageData = new FormData();
      console.log(selectedFile);
      uploadImageData.append('file', selectedFile, name);
      return this.httpClient.post<MessageResponse>(Constants.uploadDoctorImgUrl, uploadImageData, {
      });
    }
  }
