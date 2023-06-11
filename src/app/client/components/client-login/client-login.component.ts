import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Constants} from "../../../shared/constatnts";
import {MatSnackBar} from "@angular/material/snack-bar";
import Swal from "sweetalert2";


@Component({
  selector: 'app-client-login',
  templateUrl: './client-login.component.html',
  styleUrls: ['./client-login.component.css']
})
export class ClientLoginComponent implements OnInit{

  loginForm:FormGroup;

  constructor(private  formBuilder:FormBuilder,  private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      emailOrMobileNumber:['', [Validators.required, this.validateEmailOrMobileNumber]],
      password:['',[Validators.required,Validators.minLength(5),
        Validators.maxLength(30)]]
    });
  }

  login(){
    if(this.loginForm.valid){
      this.success();
      const emailOrMobileNumber = this.loginForm.controls['emailOrMobileNumber'].value;
      if (emailOrMobileNumber.match(Constants.EMAIL)){
        //login by email request
      }else if(emailOrMobileNumber.match(Constants.DIGITS_ONLY_11)){
        //login by mobileNumber request
      }
    }
  }

  success(){
    Swal.fire({
      // position: 'top-end',
      icon: 'success',
      text:"Logged in Successfully",
      title: 'Success',
      showConfirmButton: false,
      timer: 1500,
      toast:true,
      iconColor:'#00bcd4',
    });
  }

  validateEmailOrMobileNumber(control:AbstractControl):{[s:string]:boolean} | null{
    const emailOrMobileNumber = control.value;

    if (emailOrMobileNumber.length==0  ||emailOrMobileNumber.match(Constants.EMAIL) ||
      emailOrMobileNumber.match(Constants.DIGITS_ONLY_11) ){
      return null;
    } else {
      return {"emailOrMobileNumber": true};
    }
  }

}
