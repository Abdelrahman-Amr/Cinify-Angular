import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Constants} from "../../../shared/constatnts";
import Swal from "sweetalert2";
import {SwAlertService} from "../../../shared/services/sw-alert.service";
import {LoginModel} from "../../../shared/model/login-model";
import {SecurityService} from "../../../shared/services/security.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-clinic-login',
  templateUrl: './clinic-login.component.html',
  styleUrls: ['./clinic-login.component.css']
})
export class ClinicLoginComponent implements OnInit{

  loginForm:FormGroup;

  constructor(private  formBuilder:FormBuilder, private swAlertService:SwAlertService,
              private securityService:SecurityService, private router:Router) {
  }

  ngOnInit(): void {
    if(localStorage.getItem('token')){
      this.router.navigate(['/']);

    }
    this.loginForm = this.formBuilder.group({
      email:['', [Validators.required,Validators.pattern(Constants.EMAIL)]],
      password:['',[Validators.required,Validators.minLength(5),
        Validators.maxLength(30)]]
    });
  }

  login(){
    if(this.loginForm.valid){
      let loginModel = new LoginModel();
      loginModel.username=this.loginForm.controls['email'].value;
      loginModel.password=this.loginForm.controls['password'].value;

      this.securityService.login(loginModel).subscribe(value => {

        this.loginSuccess();


      },error => {
        this.swAlertService.fail('Failed to Login');
      });

    }
  }

  loginSuccess(){
    this.securityService.getJWT().subscribe( (response: any) => {
        const accessToken = response.access_token;

        localStorage.setItem('token',accessToken);

        this.getClinictData(this.loginForm.controls['email'].value);
      },
      (error) => {
        // Handle the error response
        console.error('Error:'+ error);
      }
    );
  }

  getClinictData(userName:string){
    this.securityService.getClinicData(userName).subscribe(value => {
      localStorage.setItem('user',JSON.stringify(value));
      localStorage.setItem('isClinic','true');
      this.securityService.loginSubject.next(null);

      this.swAlertService.success("Logged in Successfully");

      this.router.navigate(['/']);

    },error => {
      localStorage.removeItem('token');

      this.swAlertService.fail('Failed to Login');
    });
  }


}
