import { HttpClient } from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import { Constants } from 'src/app/shared/constatnts';
import { PatientAppointment } from 'src/app/shared/model/patient-appointment';
import { AppointmentService } from 'src/app/shared/services/appointment.service';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {EditDoctorComponent} from "../../../clinic/components/edit-doctor/edit-doctor.component";
import {RateAppointmentComponent} from "../rate-appointment/rate-appointment.component";

@Component({
  selector: 'app-client-appointment',
  templateUrl: './client-appointment.component.html',
  styleUrls: ['./client-appointment.component.css']
})
export class ClientAppointmentComponent {
    imgUrl = Constants.downloadDoctorImgUrl ;
  currentDate = new Date();


    constructor(private _http:HttpClient,public appointmentService:AppointmentService,
                private editDialog: MatDialog){

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

    rate(appointmentId: number){
      const dialogConfig = new MatDialogConfig();
      // dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.width = '90%';
      dialogConfig.height = '480px';

      // const data = new  UpdatePreviewData();
      // data.st = row;
      // data.sel = selection;
      dialogConfig.data = appointmentId;
      this.editDialog.open(RateAppointmentComponent, dialogConfig).afterClosed().subscribe(()=>{
        // this.doctorService.getDoctor(doctor.id).subscribe(value => {
        //   this.doctors[index]  = value;
        // });
      });
    }

    isBefore(date1:Date){
      return new Date(date1) < new Date();
    }

}
