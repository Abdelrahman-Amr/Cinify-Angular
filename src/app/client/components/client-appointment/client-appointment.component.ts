import { HttpClient } from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import { Constants } from 'src/app/shared/constatnts';
import { AppointmentService } from 'src/app/shared/services/appointment.service';
import { TimeFormatServiceService } from 'src/app/shared/services/time-format-service.service';

@Component({
  selector: 'app-client-appointment',
  templateUrl: './client-appointment.component.html',
  styleUrls: ['./client-appointment.component.css']
})
export class ClientAppointmentComponent {
    imgUrl = Constants.downloadDoctorImgUrl ;

    constructor(private _http:HttpClient,public appointmentService:AppointmentService,private timeFormatService: TimeFormatServiceService){

    }
    ngOnInit(): void {
      // console.log(JSON.parse(localStorage.getItem('user')).id));

      // @ts-ignore
      this.appointmentService.getAllPatientAppointmments(JSON.parse(localStorage.getItem('user')).id);
      // this.appointmentService.getAllPatientAppointmments(5);
      
    }


    handleButtonAction(appointmentId: number): void {

      const index = this.appointmentService.patientAppointment.findIndex(appointment => appointment.id === appointmentId);
          if (index !== -1) {
            this.appointmentService.patientAppointment.splice(index, 1);
            this.appointmentService.cancelPatientAppointmments(appointmentId);
      }
    }

    formatAppointmentDate(date: Date): string {
      return this.timeFormatService.formatAppointmentDate(date);
    }
    
    formatTime(time: number): string {

      return this.timeFormatService.formatTime(""+time);
    }
}
