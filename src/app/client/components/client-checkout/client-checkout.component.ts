import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-client-checkout',
  templateUrl: './client-checkout.component.html',
  styleUrls: ['./client-checkout.component.css']
})
export class ClientCheckoutComponent {
  constructor(private router: Router) {}
  book() {
    Swal.fire({
      title: 'Confirmation',
      text: 'Are you sure you want to book?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        // Book logic here
        Swal.fire('Booked!', 'Your booking has been confirmed.', 'success').then(() => {
          this.router.navigate(['/']);
        });

      }
    });
  }
}
