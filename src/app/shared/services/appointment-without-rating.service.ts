import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Constants} from "../constatnts";
import {AppointmentWithoutRatingModel} from "../model/appointment-without-rating-model";
import {DoctorModel} from "../model/doctor-model";
import {MessageResponse} from "../model/message-response";

@Injectable({
  providedIn: 'root'
})
export class AppointmentWithoutRatingService {

  constructor(private httpClient: HttpClient) { }
  getAppointmentByDoctorId(doctorId:number): Observable < AppointmentWithoutRatingModel[] > {
    return this.httpClient.get<AppointmentWithoutRatingModel[]>(Constants.getAppointmentByDoctorIdURL+doctorId,{
    });
  }

  getAppointmentUpcomingByDoctorId(doctorId:number): Observable < AppointmentWithoutRatingModel[] > {
    return this.httpClient.get<AppointmentWithoutRatingModel[]>(Constants.getAppointmentUpcomingByDoctorIdURL+doctorId,{
    });
  }

  updateAppointment(app: AppointmentWithoutRatingModel): Observable < MessageResponse > {
    return this.httpClient.put<MessageResponse>(Constants.updateAppointmentWithoutRatingURL, app);
  }
}
