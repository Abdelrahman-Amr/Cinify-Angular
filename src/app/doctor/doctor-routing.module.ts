import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {DoctorHomeComponent} from "./components/doctor-home/doctor-home.component";


const routes: Routes = [
  {
    path:'',
    component:DoctorHomeComponent
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
