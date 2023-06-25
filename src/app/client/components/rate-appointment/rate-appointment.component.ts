import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {DoctorModel} from "../../../shared/model/doctor-model";
import {AppointmentWithoutRatingService} from "../../../shared/services/appointment-without-rating.service";
import {Router} from "@angular/router";
import {SweetAlertShowClass} from "sweetalert2";
import {SwAlertService} from "../../../shared/services/sw-alert.service";

@Component({
  selector: 'app-rate-appointment',
  templateUrl: './rate-appointment.component.html',
  styleUrls: ['./rate-appointment.component.css']
})
export class RateAppointmentComponent {

  stars = [1, 2, 3, 4, 5];
  flags = [true, true, true, true, true];


  constructor(@Inject(MAT_DIALOG_DATA) public appointmentId: number,
              private appointmenService:AppointmentWithoutRatingService,
              private router:Router, private swAlertService:SwAlertService,
              private dialogRef: MatDialogRef<RateAppointmentComponent>) {

  }

  rate(){
      this.appointmenService.rateAppointment(this.appointmentId, this.getRating()).subscribe(value => {
        this.swAlertService.success("Success");
        this.dialogRef.close();
      },error => {
        this.swAlertService.fail("Failed");
      });
  }

  check(index:number){
    for(let i=0;i<5;i++) {
      if(i<=index) {
        this.flags[i] = true;
      }else{
        this.flags[i]=false;
      }
    }
  }
  getRating():number{
    let c=0;
    for(let r of this.flags){
      if(r){
        c++;
      }
    }
    return c;
  }

}
