import {AfterViewInit, Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Constants} from "../../../shared/constatnts";
import Swal from "sweetalert2";

@Component({
  selector: 'app-clinic-signup',
  templateUrl: './clinic-signup.component.html',
  styleUrls: ['./clinic-signup.component.css']
})
export class ClinicSignupComponent implements OnInit, AfterViewInit{
  cities=['Giza', 'Cairo']
  areas=['Giza', 'Cairo']
  signupForm:FormGroup;

  constructor(private  formBuilder:FormBuilder) {
  }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      name:['', [Validators.required, Validators.minLength(3),
        Validators.maxLength(30)]],

      phone:['', [Validators.required, Validators.pattern(Constants.DIGITS_ONLY_11)]],

      city:['', Validators.required],

      area:[{disabled:true, value:''}, [Validators.required, Validators.minLength(3),
        Validators.maxLength(30)]],

      address:['', [Validators.required, Validators.minLength(3),
        Validators.maxLength(50)]],

      email:['', [Validators.required, Validators.pattern(Constants.EMAIL)]],

      password:['',[Validators.required,Validators.minLength(5),
        Validators.maxLength(30)]],

      gender:['male',[Validators.required]],

    });
  }

  ngAfterViewInit(): void {
    this.signupForm.controls['city'].valueChanges.subscribe(value => {
      this.signupForm.controls['area'].enable();
    });
  }

  signup(){
    if(this.signupForm.valid){
      this.success();
    }
  }
  success(){
    Swal.fire({
      // position: 'top-end',
      icon: 'success',
      text:"SignedUp Successfully",
      title: 'Success',
      showConfirmButton: false,
      timer: 1500,
      toast:true,
      iconColor:'#00bcd4',
    });
  }


}
