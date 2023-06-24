import { HttpClient } from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import { Constants } from 'src/app/shared/constatnts';
import { PatientAppointment } from 'src/app/shared/model/patient-appointment';
import { AppointmentService } from 'src/app/shared/services/appointment.service';

@Component({
  selector: 'app-client-appointment',
  templateUrl: './client-appointment.component.html',
  styleUrls: ['./client-appointment.component.css']
})
export class ClientAppointmentComponent implements OnInit{


    constructor(private _http:HttpClient,public appointmentService:AppointmentService){

    }
    ngOnInit(): void {
      // console.log(JSON.parse(localStorage.getItem('user')).id));

      // @ts-ignore
      this.appointmentService.getAllPatientAppointmments(JSON.parse(localStorage.getItem('user')).id);

    }


    handleButtonAction(appointmentId: number): void {

      const index = this.appointmentService.patientAppointment.findIndex(appointment => appointment.id === appointmentId);
          if (index !== -1) {
            this.appointmentService.patientAppointment.splice(index, 1);
            this.appointmentService.cancelPatientAppointmments(appointmentId);
      }
    }
}
