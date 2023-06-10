import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Constants} from "../../../shared/constatnts";

@Component({
  selector: 'app-client-login',
  templateUrl: './client-login.component.html',
  styleUrls: ['./client-login.component.css']
})
export class ClientLoginComponent implements OnInit{

  loginForm:FormGroup;

  constructor(private  formBuilder:FormBuilder) {
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
      alert(JSON.stringify(this.loginForm.value));
    }
  }


}
