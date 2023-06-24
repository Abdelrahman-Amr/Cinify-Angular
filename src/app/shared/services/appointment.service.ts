import { Injectable } from '@angular/core';
import { PatientAppointment } from '../model/patient-appointment';
import { Constants } from '../constatnts';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  patientAppointment: PatientAppointment[] = [];
  constructor(private _http:HttpClient) { }
  getAllPatientAppointmments(patientId: number):void{
    // this._http.get<any>(`${Constants.getAllPatientAppointments}${patientId}`)
    this._http.get<any>(`${Constants.getAllPatientAppointments}${patientId}`)

    .subscribe(
      {
        next:response=>{
         this.patientAppointment=response;
        },
        error:error=>{}
      }
    );
  }
cancelPatientAppointmments(appointmentId: number):void{
    // this._http.put<String>(`${Constants.CancelPatientAppointment}${appointmentId}`,appointmentId)
    this._http.put<String>(`${Constants.CancelPatientAppointment}6`,appointmentId)
.subscribe(
  {
    next:response=>{
      alert(response);
    },
    error:error=>{}
  }
);
}
}
