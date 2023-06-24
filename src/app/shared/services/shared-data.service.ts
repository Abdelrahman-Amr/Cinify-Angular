import { Injectable } from '@angular/core';
import { AppointmentWithoutRatingModel } from '../model/appointment-without-rating-model';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
  public currentAppointment: AppointmentWithoutRatingModel | null = null;
  constructor() { }
}
