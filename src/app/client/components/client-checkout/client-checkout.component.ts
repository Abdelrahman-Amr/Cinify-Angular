import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { SwAlertService } from "../../../shared/services/sw-alert.service";
import { Constants } from "../../../shared/constatnts";
import { SharedDataService } from 'src/app/shared/services/shared-data.service';
import { TimeFormatServiceService } from 'src/app/shared/services/time-format-service.service';
import { BookAppointmentService } from 'src/app/shared/services/book-appointment.service';
import { AppointmentWithoutRatingModel } from 'src/app/shared/model/appointment-without-rating-model';

@Component({
  selector: 'app-client-checkout',
  templateUrl: './client-checkout.component.html',
  styleUrls: ['./client-checkout.component.css']
})
export class ClientCheckoutComponent implements OnInit {

  imgUrl = Constants.downloadDoctorImgUrl;

  currentAppointment = this.sharedData.currentAppointment

  constructor(private router: Router, private swAlertService: SwAlertService,
    private sharedData: SharedDataService, private timeFormatService: TimeFormatServiceService,
    private bookAppointmentService: BookAppointmentService) { }
  ngOnInit(): void {
    console.log("CUR APP:", this.sharedData.currentAppointment);
    if (this.sharedData.currentAppointment.id == undefined) {
      this.router.navigate(['/']);
    }
  }
  book() {
    Swal.fire({
      title: 'Confirmation',
      text: 'Are you sure you want to book?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      toast: true,
      iconColor: '#11468f',
      confirmButtonColor: '#11468f',
    }).then((result) => {
      if (result.isConfirmed) {

        // Book logic here
        // @ts-ignore
        this.bookAppointmentService.bookAppointment(this.sharedData.currentAppointment.id, JSON.parse(localStorage.getItem('user')).id ).subscribe(
          (data) => {
            console.log('Data received:', data);
            this.swAlertService.success('Your booking has been confirmed.').then(() => {
              this.sharedData.currentAppointment = new AppointmentWithoutRatingModel();
              this.router.navigate(['/']);
            });
          },
          (error) => {
            console.error('Error occurred:', error);
            this.swAlertService.fail('Your booking has failed.').then(() => {
              this.sharedData.currentAppointment = new AppointmentWithoutRatingModel();
              this.router.navigate(['/']);
            });
          }
        );
      }
    });
  }

  formatAppointmentDate(date: Date): string {
    return this.timeFormatService.formatAppointmentDate(date);
  }

  formatTime(time: string): string {
    return this.timeFormatService.formatTime(time);
  }
}
