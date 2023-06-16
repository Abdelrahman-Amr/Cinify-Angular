import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Constants} from "../../../shared/constatnts";
import Swal from "sweetalert2";
import {SwAlertService} from "../../../shared/services/sw-alert.service";

@Component({
  selector: 'app-clinic-login',
  templateUrl: './clinic-login.component.html',
  styleUrls: ['./clinic-login.component.css']
})
export class ClinicLoginComponent implements OnInit{

  loginForm:FormGroup;

  constructor(private  formBuilder:FormBuilder, private swAlertService:SwAlertService) {
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email:['', [Validators.required,Validators.pattern(Constants.EMAIL)]],
      password:['',[Validators.required,Validators.minLength(5),
        Validators.maxLength(30)]]
    });
  }

  login(){
    if(this.loginForm.valid){
      this.swAlertService.success("Logged in Successfully");
      const emailOrMobileNumber = this.loginForm.controls['emailOrMobileNumber'].value;
      if (emailOrMobileNumber.match(Constants.EMAIL)){
        //login by email request
      }else if(emailOrMobileNumber.match(Constants.DIGITS_ONLY_11)){
        //login by mobileNumber request
      }
    }
  }



}
