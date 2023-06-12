import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {DoctorHomeComponent} from "./components/doctor-home/doctor-home.component";
import {ClinicSignupComponent} from "./components/clinic-signup/clinic-signup.component";
import {ClinicLoginComponent} from "./components/clinic-login/clinic-login.component";


const routes: Routes = [
  {
    path:'',
    component:DoctorHomeComponent
  },
  {
    path:'signup',
    component:ClinicSignupComponent
  },
  {
    path:'login',
    component:ClinicLoginComponent
  }

  ];
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class DoctorRoutingModule { }
