import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators} from "@angular/forms";
import {Constants} from "../../../shared/constatnts";
import Swal from "sweetalert2";
import {SwAlertService} from "../../../shared/services/sw-alert.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-client-signup',
  templateUrl: './client-signup.component.html',
  styleUrls: ['./client-signup.component.css']
})
export class ClientSignupComponent  implements OnInit{
  cities=['Giza', 'Cairo']
  signupForm:FormGroup;

  constructor(private  formBuilder:FormBuilder, private swAlertService:SwAlertService,
              private router:Router) {
  }

  ngOnInit(): void {
    if(localStorage.getItem('token')){
      this.router.navigate(['/']);
    }
    this.signupForm = this.formBuilder.group({
      name:['', [Validators.required, Validators.minLength(3),
      Validators.maxLength(30)]],

      phone:['', [Validators.required, Validators.pattern(Constants.DIGITS_ONLY_11)]],

      dob:['', [Validators.required]],
      email:['', [Validators.required, Validators.pattern(Constants.EMAIL)]],

      password:['',[Validators.required,Validators.minLength(5),
        Validators.maxLength(30)]],

      gender:['male',[Validators.required]],

    });
  }

  signup(){
    if(this.signupForm.valid){
      this.swAlertService.success("SignedUp Successfully");
    }
  }


}
