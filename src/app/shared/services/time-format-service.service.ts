import { formatDate } from '@angular/common';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TimeFormatServiceService {

  constructor() { }

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
  
}
