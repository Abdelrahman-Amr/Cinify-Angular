import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ClinicRoutingModule} from "./clinic-routing.module";
import { DoctorHomeComponent } from './components/doctor-home/doctor-home.component';
import { ClinicSignupComponent } from './components/clinic-signup/clinic-signup.component';
import {MatButtonModule} from "@angular/material/button";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatDividerModule} from "@angular/material/divider";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatRadioModule} from "@angular/material/radio";
import {ReactiveFormsModule} from "@angular/forms";
import {RouterLink} from "@angular/router";
import {MatNativeDateModule, MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import { ClinicLoginComponent } from './components/clinic-login/clinic-login.component';
import {MatSnackBarModule} from "@angular/material/snack-bar";
import { AddDoctorComponent } from './components/add-doctor/add-doctor.component';



@NgModule({
  declarations: [
    DoctorHomeComponent,
    ClinicSignupComponent,
    ClinicLoginComponent,
    AddDoctorComponent
  ],
  imports: [
    CommonModule,
    ClinicRoutingModule,
    MatButtonModule,
    MatDatepickerModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    ReactiveFormsModule,
    RouterLink,
    MatOptionModule,
    MatSelectModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ]
})
export class ClinicModule { }
