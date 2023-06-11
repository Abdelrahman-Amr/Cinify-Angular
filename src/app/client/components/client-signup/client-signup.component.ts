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
  cities=['Giza', 'Cairo']
  signupForm:FormGroup;

  constructor(private  formBuilder:FormBuilder) {
  }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      name:['', [Validators.required, Validators.minLength(3),
      Validators.maxLength(30)]],

      phone:['', [Validators.required, Validators.pattern(Constants.DIGITS_ONLY_11)]],

      dob:['', [Validators.required]],
      city:['', Validators.required],
      area:['', [Validators.required, Validators.minLength(3),
        Validators.maxLength(30)]],

      address:['', [Validators.required, Validators.minLength(3),
        Validators.maxLength(30)]],

      email:['', [Validators.required, Validators.pattern(Constants.EMAIL)]],

      password:['',[Validators.required,Validators.minLength(5),
        Validators.maxLength(30)]],

      gender:['male',[Validators.required]],

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


}
