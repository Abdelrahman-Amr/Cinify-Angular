import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {DoctorHomeComponent} from "./components/doctor-home/doctor-home.component";
import {ClinicSignupComponent} from "./components/clinic-signup/clinic-signup.component";
import {ClinicLoginComponent} from "./components/clinic-login/clinic-login.component";
import {AddDoctorComponent} from "./components/add-doctor/add-doctor.component";
import {ManageDoctorsComponent} from "./components/manage-doctors/manage-doctors.component";
import {AuthGuard} from "../shared/services/auth.guard";
import { ClinicHomeComponent } from './components/clinic-home/clinic-home.component';


const routes: Routes = [
  {
    path:'',
    component:ClinicHomeComponent,

  },
  {
    path:'signup',
    component:ClinicSignupComponent
  },
  {
    path:'login',
    component:ClinicLoginComponent
  },
  {
    path:'add-doctor',
    component:AddDoctorComponent,
    canActivate: [AuthGuard],
    data:{
      name:'clinic'
    }
  },
  {
    path:'manage-doctors',
    component:ManageDoctorsComponent,
    canActivate: [AuthGuard],
    data:{
      name:'clinic'
    }
  }


  ];
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class ClinicRoutingModule { }
