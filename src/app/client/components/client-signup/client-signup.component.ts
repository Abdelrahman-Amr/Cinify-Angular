import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators} from "@angular/forms";
import {Constants} from "../../../shared/constatnts";
import Swal from "sweetalert2";
import {SwAlertService} from "../../../shared/services/sw-alert.service";
import {ActivatedRoute, Router} from "@angular/router";
import {DoctorModel} from "../../../shared/model/doctor-model";
import {DoctorSpecializationModel} from "../../../shared/model/doctor-specialization-model";
import {DoctorTitleModel} from "../../../shared/model/doctor-title-model";
import {ClinicModel} from "../../../shared/model/clinic-model";
import {PatientModel} from "../../../shared/model/patient-model";
import {PatientService} from "../../../shared/services/patient.service";
import {LoginModel} from "../../../shared/model/login-model";
import {SecurityService} from "../../../shared/services/security.service";

@Component({
  selector: 'app-client-signup',
  templateUrl: './client-signup.component.html',
  styleUrls: ['./client-signup.component.css']
})
export class ClientSignupComponent  implements OnInit{
  cities=['Giza', 'Cairo']
  signupForm:FormGroup;
  errorMsg='';


  constructor(private  formBuilder:FormBuilder, private swAlertService:SwAlertService,
              private router:Router, private patientService:PatientService, private securityService:SecurityService,
              private activatedRoute:ActivatedRoute) {
  }

  ngOnInit(): void {
    // if(localStorage.getItem('token')){
    //   this.router.navigate(['/']);
    // }
    this.signupForm = this.formBuilder.group({
      name:['', [Validators.required, Validators.minLength(3),
      Validators.maxLength(30)]],

      phone:['', [Validators.required, Validators.pattern(Constants.DIGITS_ONLY_11)]],

      dob:['', [Validators.required,this.patientService.minAge(15, 'You must be at least 15 years old')]],
      email:['', [Validators.required, Validators.pattern(Constants.EMAIL)]],

      password:['',[Validators.required,Validators.minLength(5),
        Validators.maxLength(30)]],

      gender:['Male',[Validators.required]],



    });
  }

  signup(){
    if(this.signupForm.valid){
      let patient= new PatientModel();
      patient.fullName =this.signupForm.controls['name'].value;
      patient.phoneNumber = this.signupForm.controls['phone'].value;
      patient.email = this.signupForm.controls['email'].value;
      patient.password = this.signupForm.controls['password'].value;
      patient.gender =  this.signupForm.controls['gender'].value;
      patient.birthDate =  this.signupForm.controls['dob'].value;
      patient.isDeleted=false;
      this.patientService.addPatient(patient).subscribe(value => {
        // console.log(value);

        let loginModel = new LoginModel();
        loginModel.username=patient.email;
        loginModel.password=patient.password;

        this.securityService.login(loginModel).subscribe(value => {
          // console.log(value);
          localStorage.setItem('user',JSON.stringify(value));
          this.loginSuccess();

      });
    },error => {
        const formControl = this.signupForm.get(error.error.field);
        this.errorMsg = error.error.message;
        if (formControl) {
          formControl.setErrors({
            serverError: true
          });
        }
      });
  }
  }
    loginSuccess(){
      this.swAlertService.success("SignedUp Successfully");
      this.securityService.getJWTPatient().subscribe( (response: any) => {
          const accessToken = response.access_token;
          localStorage.setItem('token',accessToken);

          this.getPatientData(this.signupForm.controls['email'].value);


          // if(this.activatedRoute.snapshot.params['isCheckout']=='1'){
          //   this.router.navigate(['/checkout']);
          //
          // }else {
          //   this.router.navigate(['/']);
          // }
        },
        (error) => {
          this.swAlertService.fail('Failed to Login');
        }
      );
    }


  getPatientData(userName:string){
    this.securityService.getPatientData(userName).subscribe(value => {
      localStorage.setItem('user',JSON.stringify(value));
      this.securityService.loginSubject.next(null);

      this.swAlertService.success("Logged in Successfully");


      if(this.activatedRoute.snapshot.params['isCheckout']=='1'){
        this.router.navigate(['/checkout']);

      }else {
        this.router.navigate(['/']);
      }

    },error => {
      localStorage.removeItem('token');
      this.swAlertService.fail('Failed to Login');
    });
  }

}
