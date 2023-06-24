import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { DoctorService } from "../../../../shared/services/doctor.service";
import { AppointmentWithoutRatingService } from 'src/app/shared/services/appointment-without-rating.service';
import { formatDate } from '@angular/common';
import { DoctorModel } from "../../../../shared/model/doctor-model";
import {
  AppointmentWithoutRatingModel
} from "../../../../shared/model/appointment-without-rating-model";
import { Constants } from "../../../../shared/constatnts";
import { SearchResultService } from "../../../../shared/services/search-result-service.service";
import { Subscription } from "rxjs";
import { SharedDataService } from 'src/app/shared/services/shared-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit, OnDestroy {

  stars = [1, 2, 3, 4, 5];
  @Input() rate = 0;
  setRate(newRate: number) {
    this.rate = newRate;
  }

  doctors: DoctorModel[] = [];
  appointments: AppointmentWithoutRatingModel[] = [];
  doctor = new DoctorModel();
  page: number = 1;
  limit = 10;
  totalCount = 0;
  isLoading = true;
  imgUrl = Constants.downloadDoctorImgUrl + 'doctor-clinic-illustration_1270-69.avif';
  doctorSubscription: Subscription;

  constructor(private doctorService: DoctorService, private appointmentService: AppointmentWithoutRatingService,
    public searchResultService: SearchResultService, private sharedData: SharedDataService,private router:Router) {
  }

  ngOnInit(): void {

    // this.doctorService.getDoctorsPage(this.page, this.limit).subscribe(value => {

    this.doctorSubscription = this.searchResultService.doctorsSubject.subscribe(value => {
      // console.log(value);
      this.isLoading = false;
      this.doctors = value.data;
      this.totalCount = value.totalCount;
      for (let index = 0; index < this.doctors.length; index++) {
        this.appointmentService.getAppointmentUpcomingByDoctorId(this.doctors[index].id).subscribe(appointments => {
          this.searchResultService.doctorsSearchResult[index].appointments = appointments;
        });
      }
    });



    //
    //   const appointmentObservables = this.searchResultService.doctorsSearchResult.map(doctor => {
    //     return this.appointmentService.getAppointmentUpcomingByDoctorId(doctor.id);
    //   });
    //
    //   forkJoin(appointmentObservables).subscribe(appointmentsArray => {
    //     appointmentsArray.forEach((appointments, index) => {
    //       this.searchResultService.doctorsSearchResult[index].appointments = appointments;
    //     });
    //   });
    // });

  }

  formatAppointmentDate(date: Date): string {

    console.log("*****");
    console.log(this.doctors[0].appointments);

    const appointmentDate = new Date(date);
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);

    if (this.isSameDate(appointmentDate, today)) {
      return 'Today';
    } else if (this.isSameDate(appointmentDate, tomorrow)) {
      return 'Tomorrow';
    } else {
      return formatDate(appointmentDate, 'EEEE dd/MM', 'en-US');
    }

  }


  isSameDate(date1: Date, date2: Date): boolean {

    const d1 = new Date(date1);
    const d2 = new Date(date2);
    d1.setHours(0, 0, 0, 0);
    d2.setHours(0, 0, 0, 0);

    return d1.getTime() === d2.getTime();

  }

  formatTime(time: string): string {

    if (time != null) {
      const date = new Date();
      const [hours, minutes] = time.split(':');
      date.setHours(Number(hours));
      date.setMinutes(Number(minutes));

      return formatDate(date, 'h:mm a', 'en-US');
    }
    return "";

  }

  getTimesForDay(date: Date, id: number): string[] {

    const doctor = this.doctors.find(doctor => doctor.id === id);

    if (doctor && doctor.appointments) {
      const dayAppointments = doctor.appointments.filter(appointment => this.isSameDate(appointment.date, date));
      return dayAppointments.map(appointment => this.formatTime(appointment.startTime));
    }
    return [];

  }
  nextPage() {

    this.doctorService.getDoctorsPage(this.page, this.limit).subscribe(value => {
      this.doctors = value.data;
    });

  }

  ngOnDestroy(): void {
    this.doctorSubscription.unsubscribe();
  }


  checkOut(appointment: AppointmentWithoutRatingModel) {
    this.sharedData.currentAppointment = appointment;
    this.router.navigate(["checkout"])
  }
}
