import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constants } from '../constatnts';
import { Observable } from 'rxjs';
import { MessageResponse } from '../model/message-response';

@Injectable({
  providedIn: 'root'
})
export class BookAppointmentService {

  constructor(private httpClient: HttpClient) { }

  bookAppointment(appointmentId: number, patientId: number): Observable<MessageResponse> {

    return this.httpClient.put<MessageResponse>(Constants.bookAppointmentUrl+appointmentId+patientId,{});

  }
}
