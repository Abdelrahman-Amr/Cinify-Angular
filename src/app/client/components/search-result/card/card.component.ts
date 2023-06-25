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
import { Router } from "@angular/router";
import { TimeFormatServiceService } from "../../../../shared/services/time-format-service.service";
import { SharedDataService } from "../../../../shared/services/shared-data.service";

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
  doctor = new DoctorModel();
  page: number = 1;
  limit = 10;
  totalCount = 0;
  isLoading = true;
  imgUrl = Constants.downloadDoctorImgUrl;
  doctorSubscription: Subscription;

  constructor(private doctorService: DoctorService, private appointmentService: AppointmentWithoutRatingService,
    public searchResultService: SearchResultService, private sharedData: SharedDataService, private router: Router,
    private timeFormatService: TimeFormatServiceService) {
  }

  ngOnInit(): void {
    this.doctorSubscription = this.searchResultService.doctorsSubject.subscribe(value => {
      if (value && value.data && value.data.length > 0) {
        this.doctors = value.data;
        this.totalCount = value.totalCount;
        console.log("length " + this.doctors.length)
        for (let index = 0; index < this.doctors.length; index++) {
          this.appointmentService.getDividedAppointmentUpcomingByDoctorId(this.doctors[index].id).subscribe(appointments => {
            if (this.searchResultService.doctorsSearchResult[index]) {
              this.searchResultService.doctorsSearchResult[index].appointments = appointments;
              this.searchResultService.doctorsSearchResult[index].appointmentsByDay = this.getTimesForDay(this.doctors[index]);
            }
          });
        }

        this.isLoading = false;
      }
    });

  }

  formatAppointmentDate(date: Date): string {
    return this.timeFormatService.formatAppointmentDate(date);
  }

  formatTime(time: string): string {
    return this.timeFormatService.formatTime(time);
  }

  isSameDate(date1: Date, date2: Date): boolean {
    return this.timeFormatService.isSameDate(date1, date2);
  }

  nextPage() {

    this.doctorService.getDoctorsPage(this.page, this.limit).subscribe(value => {
      this.searchResultService.doctorsSearchResult = value.data;
      this.searchResultService.doctorsSubject.next(value);
    });


  }

  ngOnDestroy(): void {
    this.doctorSubscription.unsubscribe();
  }
  checkOut(appointment: AppointmentWithoutRatingModel) {
    this.sharedData.currentAppointment = appointment;
    this.router.navigate(["checkout"])
  }

  getTimesForDay(doctor: DoctorModel): { date: Date, times: AppointmentWithoutRatingModel[] }[] {

    if (doctor && doctor.appointments) {
      const appointmentsByDay: { date: Date, times: AppointmentWithoutRatingModel[] }[] = [];

      doctor.appointments.forEach(appointment => {
        const existingDay = appointmentsByDay.find(day => this.isSameDate(day.date, appointment.date));
        const time = this.formatTime(appointment.startTime);

        if (existingDay) {
          existingDay.times.push(appointment);
        } else {
          appointmentsByDay.push({ date: appointment.date, times: [appointment] });
        }
      });

      return appointmentsByDay;
    }

    return [];
  }


}
