import { Injectable } from '@angular/core';
import Swal from "sweetalert2";

@Injectable({
  providedIn: 'root'
})
export class SwAlertService {

  constructor() { }

   success(message:string){
    Swal.fire({
      // position: 'top-end',
      icon: 'success',
      text:message,
      title: 'Success',
      showConfirmButton: false,
      timer: 1500,
      toast:true,
      iconColor:'#11468f',
    });
  }
}
