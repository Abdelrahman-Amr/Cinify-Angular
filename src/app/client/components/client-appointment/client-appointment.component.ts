import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Constants } from 'src/app/shared/constatnts';
import { PatientAppointment } from 'src/app/shared/model/patient-appointment';

@Component({
  selector: 'app-client-appointment',
  templateUrl: './client-appointment.component.html',
  styleUrls: ['./client-appointment.component.css']
})
export class ClientAppointmentComponent {
    patientAppointment: PatientAppointment[] = [];
    constructor(private _http:HttpClient){

    }
    ngOnInit(): void {

      this.getAllPatientAppointmments();
    }
    getAllPatientAppointmments():void{
      this._http.get<any>(`${Constants.getAllPatientAppointments}6`)
      .subscribe(
        {
          next:response=>{
           this.patientAppointment=response;
          },
          error:error=>{}
        }
      );
    }

  handleButtonClick(i:number):void{

  }
}
