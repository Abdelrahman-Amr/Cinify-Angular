import {AfterViewInit, Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Constants} from "../../../shared/constatnts";
import Swal from "sweetalert2";
import {SwAlertService} from "../../../shared/services/sw-alert.service";
import {Router} from "@angular/router";
import {PatientModel} from "../../../shared/model/patient-model";
import {LoginModel} from "../../../shared/model/login-model";
import {ClinicModel} from "../../../shared/model/clinic-model";
import {CityModel} from "../../../shared/model/city-model";
import {ClinicService} from "../../../shared/services/clinic.service";
import {SecurityService} from "../../../shared/services/security.service";
import {AreaModel} from "../../../shared/model/area-model";
import {SessionStorageService} from "../../../shared/services/session-storage.service";
import {AreaService} from "../../../shared/services/area.service";

@Component({
  selector: 'app-clinic-signup',
  templateUrl: './clinic-signup.component.html',
  styleUrls: ['./clinic-signup.component.css']
})
export class ClinicSignupComponent implements OnInit, AfterViewInit{
  cities:CityModel[]=[];
  areas:AreaModel[]=[];
  signupForm:FormGroup;
  errorMsg:string;

  constructor(private  formBuilder:FormBuilder, private swAlertService:SwAlertService,
              private router:Router, private clinicService:ClinicService, private securityService:SecurityService,
              private sessionStorageService:SessionStorageService, private areaService:AreaService) {
  }

  ngOnInit(): void {

    if(localStorage.getItem('token')){
      this.router.navigate(['/']);
    }
    this.cities = this.sessionStorageService.getCities();
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
        Validators.maxLength(30)]]
    });
  }

  ngAfterViewInit(): void {
    this.signupForm.controls['city'].valueChanges.subscribe(value => {
      this.signupForm.controls['area'].enable();
      this.areaService.getAreaByCity(this.signupForm.controls['city'].value.id).subscribe(value2=>{
        this.areas = value2;
      });
    });
  }

  signup(){
    if(this.signupForm.valid){
      let clinic= new ClinicModel(0);
      clinic.isDeleted=false;
      clinic.status='Pending';
      clinic.username =this.signupForm.controls['name'].value;
      clinic.name =this.signupForm.controls['name'].value;
      clinic.phoneNumber = this.signupForm.controls['phone'].value;
      clinic.city = this.signupForm.controls['city'].value;
      clinic.area = this.signupForm.controls['area'].value;
      clinic.address = this.signupForm.controls['address'].value;
      clinic.email = this.signupForm.controls['email'].value;
      clinic.password = this.signupForm.controls['password'].value;
      this.clinicService.addClinic(clinic).subscribe(value => {
        // console.log(value);

        let loginModel = new LoginModel();
        loginModel.username=clinic.email;
        loginModel.password=clinic.password;

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
    // this.swAlertService.success("SignedUp Successfully");
    this.securityService.getJWTClinic().subscribe( (response: any) => {
        const accessToken = response.access_token;
        localStorage.setItem('token',accessToken);

        this.getClinictData(this.signupForm.controls['email'].value);


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


  getClinictData(userName:string){
    this.securityService.getClinicData(userName).subscribe(value => {
      localStorage.setItem('user',JSON.stringify(value));
      localStorage.setItem('isClinic','true');
      this.securityService.loginSubject.next(null);

      this.swAlertService.success("Signed Up Successfully");

      this.router.navigate(['/clinic']);

    },error => {
      localStorage.removeItem('token');

      this.swAlertService.fail('Failed to Sign Up');
    });
  }

}
