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

        localStorage.setItem('user',JSON.stringify(value));
        localStorage.setItem('isClinic','true');

        this.securityService.loginSubject.next(null);
        this.loginSuccess();

      },error => {
        this.swAlertService.fail('Failed to Login');
      });

    }
  }


  loginSuccess(){
    this.swAlertService.success("Logged in Successfully");
    this.securityService.getJWT().subscribe( (response: any) => {
        const accessToken = response.access_token;
        localStorage.setItem('token',JSON.stringify(accessToken));
        this.router.navigate(['/']);
      },
      (error) => {
        // Handle the error response
        console.error('Error:'+ error);
      }
    );
  }




}
