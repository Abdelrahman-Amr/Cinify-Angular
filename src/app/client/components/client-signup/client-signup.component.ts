import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators} from "@angular/forms";
import {Constants} from "../../../shared/constatnts";
import Swal from "sweetalert2";

@Component({
  selector: 'app-client-signup',
  templateUrl: './client-signup.component.html',
  styleUrls: ['./client-signup.component.css']
})
export class ClientSignupComponent  implements OnInit{

  signupForm:FormGroup;

  constructor(private  formBuilder:FormBuilder) {
  }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      name:['', [Validators.required, Validators.minLength(3),
      Validators.maxLength(30)]],

      phone:['', [Validators.required, Validators.pattern(Constants.DIGITS_ONLY_11)]],

      dob:['', [Validators.required]],

      password:['',[Validators.required,Validators.minLength(5),
        Validators.maxLength(30)]],

      confirmPassword:['', [Validators.required,Validators.minLength(5),
        Validators.maxLength(30),this.passwordMatchValidator.bind(this)]]
    });
  }

  login(){
    if(this.signupForm.valid){
      this.success();
    }
  }
  success(){
    Swal.fire({
      // position: 'top-end',
      icon: 'success',
      text:"SignedUp in Successfully",
      title: 'Success',
      showConfirmButton: false,
      timer: 1500,
      toast:true,
      iconColor:'#00bcd4',
    });
  }
  passwordMatchValidator(control: AbstractControl):{[s:string]:boolean} | null {

    const password = this.signupForm?.controls['password'].value;
    const confirmPassword = control.value;
    if (password !== confirmPassword) {
      return { 'passwordMismatch': true };
    } else {
      return null;
    }
  }

}
