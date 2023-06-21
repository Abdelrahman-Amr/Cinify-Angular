import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import {SwAlertService} from "../../../shared/services/sw-alert.service";

@Component({
  selector: 'app-client-checkout',
  templateUrl: './client-checkout.component.html',
  styleUrls: ['./client-checkout.component.css']
})
export class ClientCheckoutComponent {
  constructor(private router: Router, private swAlertService:SwAlertService) {}
  book() {
    Swal.fire({
      title: 'Confirmation',
      text: 'Are you sure you want to book?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      toast:true,
      iconColor:'#11468f',
      confirmButtonColor: '#11468f',
    }).then((result) => {
      if (result.isConfirmed) {

        // Book logic here
        this.swAlertService.success('Your booking has been confirmed.').then(() => {
          this.router.navigate(['/']);
        });

      }
    });
  }
}
