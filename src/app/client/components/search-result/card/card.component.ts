import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { DoctorService } from "../../../../shared/services/doctor.service";
import { DoctorModel } from "../../../../shared/model/doctor-model";
import { AppointmentWithoutRatingModel } from 'src/app/shared/model/appointment-without-rating-model';
import { AppointmentWithoutRatingService } from 'src/app/shared/services/appointment-without-rating.service';
import { forkJoin } from 'rxjs';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

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

  constructor(private doctorService: DoctorService, private appointmentService: AppointmentWithoutRatingService) {
  }

  ngOnInit(): void {

    this.doctorService.getDoctorsPage(this.page, this.limit).subscribe(value => {
      this.doctors = value.data;
      this.totalCount = value.totalCount;

      const appointmentObservables = this.doctors.map(doctor => {
        return this.appointmentService.getAppointmentUpcomingByDoctorId(doctor.id);
      });

      forkJoin(appointmentObservables).subscribe(appointmentsArray => {
        appointmentsArray.forEach((appointments, index) => {
          this.doctors[index].appointments = appointments;
        });
        console.log(this.doctors[0])
      });
    });


  }

  formatAppointmentDate(date: Date): string {

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
      return dayAppointments.map(appointment => this.formatTime(appointment.endTime));
    }
    return [];

  }

  nextPage() {

    this.doctorService.getDoctorsPage(this.page, this.limit).subscribe(value => {
      this.doctors = value.data;
    });

  }

}
