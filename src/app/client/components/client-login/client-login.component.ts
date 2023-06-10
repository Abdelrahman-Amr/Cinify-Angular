import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
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
      phone:['', Validators.compose([Validators.required, Validators.pattern(Constants.DIGITS_ONLY_11)])],
      password:['',Validators.compose([Validators.required,Validators.minLength(5),
        Validators.maxLength(30)])]
    });
  }

  login(){
    if(this.loginForm.valid){
      this.success();
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

}
