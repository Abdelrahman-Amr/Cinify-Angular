import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Constants} from "../../../shared/constatnts";
import {SwAlertService} from "../../../shared/services/sw-alert.service";
import {SecurityService} from "../../../shared/services/security.service";
import {LoginModel} from "../../../shared/model/login-model";


@Component({
  selector: 'app-client-login',
  templateUrl: './client-login.component.html',
  styleUrls: ['./client-login.component.css']
})
export class ClientLoginComponent implements OnInit{

  loginForm:FormGroup;

  constructor(private  formBuilder:FormBuilder, private swAlertService:SwAlertService,
              private securityService:SecurityService) {
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      emailOrMobileNumber:['', [Validators.required, this.validateEmailOrMobileNumber]],
      password:['',[Validators.required,Validators.minLength(5),
        Validators.maxLength(30)]]
    });
  }

  login(){
    if(this.loginForm.valid){
      const emailOrMobileNumber = this.loginForm.controls['emailOrMobileNumber'].value;
      if (emailOrMobileNumber.match(Constants.EMAIL)){
        let loginModel = new LoginModel();
        loginModel.username=this.loginForm.controls['emailOrMobileNumber'].value;
        loginModel.password=this.loginForm.controls['password'].value;

        this.securityService.login(loginModel).subscribe(value => {
          this.loginSuccess();
        },error => {
          this.swAlertService.fail('Failed to Login');
        });
      }else if(emailOrMobileNumber.match(Constants.DIGITS_ONLY_11)){
        //login by mobileNumber request
      }
    }
  }


  loginSuccess(){
    this.swAlertService.success("Logged in Successfully");
    this.securityService.getJWT().subscribe( (response: any) => {
        const accessToken = response.access_token;
        console.log('Access Token:', accessToken);
      },
      (error) => {
        // Handle the error response
        console.error('Error:'+ error);
      }
    );
  }

  validateEmailOrMobileNumber(control:AbstractControl):{[s:string]:boolean} | null{
    const emailOrMobileNumber = control.value;

    if (emailOrMobileNumber.length==0  ||emailOrMobileNumber.match(Constants.EMAIL) ||
      emailOrMobileNumber.match(Constants.DIGITS_ONLY_11) ){
      return null;
    } else {
      return {"emailOrMobileNumber": true};
    }
  }

  // loginSuccess(){
  //   this.swAlertService.success("Logged in Successfully");
  //   this.securityService.getAuthCode().subscribe( (response: any) => {
  //       // Process the response to extract the authorization code
  //       const authorizationCode = response.authorization_code;
  //       console.log('Authorization Code:', authorizationCode);
  //     },
  //     (error) => {
  //       // Handle the error response
  //       console.error('Error:'+ error);
  //     }
  //   );
  // }
}
