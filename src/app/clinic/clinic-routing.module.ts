import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {DoctorHomeComponent} from "./components/doctor-home/doctor-home.component";
import {ClinicSignupComponent} from "./components/clinic-signup/clinic-signup.component";
import {ClinicLoginComponent} from "./components/clinic-login/clinic-login.component";
import {AddDoctorComponent} from "./components/add-doctor/add-doctor.component";
import {ManageDoctorsComponent} from "./components/manage-doctors/manage-doctors.component";
import { SearchResultComponent } from '../client/components/search-result/search-result.component';


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
  },
  {
    path:'add-doctor',
    component:AddDoctorComponent
  },
  {
    path:'manage-doctors',
    component:ManageDoctorsComponent
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
