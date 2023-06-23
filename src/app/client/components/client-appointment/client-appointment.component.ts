import { Component } from '@angular/core';

@Component({
  selector: 'app-client-appointment',
  templateUrl: './client-appointment.component.html',
  styleUrls: ['./client-appointment.component.css']
})
export class ClientAppointmentComponent {
    tableData: any[] = [
      {
        doctorName: 'John Doe',
        address: '123 Main St',
        reservationDate: '2023-06-10',
        statues: 'Yes',
        from: '9:00 AM',
        to: '11:00 AM'
      },
      {
        doctorName: 'Jane Smith',
        address: '456 Elm St',
        reservationDate: '2023-06-11',
        statues: 'No',
        from: '2:00 PM',
        to: '4:00 PM'
      },
      // Add more objects for additional rows
    ];
  
  handleButtonClick(i:number):void{

  }
}
