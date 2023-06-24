import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import { DoctorService } from "../../../../shared/services/doctor.service";
import { AppointmentWithoutRatingService } from 'src/app/shared/services/appointment-without-rating.service';
import { formatDate } from '@angular/common';
import {DoctorModel} from "../../../../shared/model/doctor-model";
import {
  AppointmentWithoutRatingModel
} from "../../../../shared/model/appointment-without-rating-model";
import {Constants} from "../../../../shared/constatnts";
import {SearchResultService} from "../../../../shared/services/search-result-service.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit , OnDestroy{

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
  imgUrl=Constants.downloadDoctorImgUrl;
  doctorSubscription:Subscription;

  constructor(private doctorService: DoctorService, private appointmentService: AppointmentWithoutRatingService,
    public searchResultService: SearchResultService, private sharedData: SharedDataService,private router:Router,
    private timeFormatService: TimeFormatServiceService) {
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
      for(let index=0;index<  this.doctors.length;index++) {
        this.appointmentService.getFullAppointmentUpcomingByDoctorId(this.doctors[index].id).subscribe(appointments => {
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
    return this.timeFormatService.formatAppointmentDate(date);
  }

  formatTime(time: string): string {
    return this.timeFormatService.formatTime(time);
  }

  isSameDate(date1: Date, date2: Date): boolean {
    return this.timeFormatService.isSameDate(date1,date2);
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
