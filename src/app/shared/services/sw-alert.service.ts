import { Injectable } from '@angular/core';
import Swal, {SweetAlertResult} from "sweetalert2";

@Injectable({
  providedIn: 'root'
})
export class SwAlertService {

  constructor() { }

   success(message:string):Promise<SweetAlertResult<any>>{
    return Swal.fire({
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

  fail(message:string){
    Swal.fire({
      // position: 'top-end',
      icon: 'error',
      text:message,
      title: 'Fail',
      showConfirmButton: false,
      timer: 2000,
      toast:true,
      iconColor:'red',
    });
  }
}
