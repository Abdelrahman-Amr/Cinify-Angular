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
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterLink} from "@angular/router";
import {MatNativeDateModule, MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import { ClinicLoginComponent } from './components/clinic-login/clinic-login.component';
import {MatSnackBarModule} from "@angular/material/snack-bar";
import { AddDoctorComponent } from './components/add-doctor/add-doctor.component';
import { ManageDoctorsComponent } from './components/manage-doctors/manage-doctors.component';
import {MatIconModule} from "@angular/material/icon";
import { EditDoctorComponent } from './components/edit-doctor/edit-doctor.component';
import {MatDialogModule} from "@angular/material/dialog";
import {NgbPagination} from "@ng-bootstrap/ng-bootstrap";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatCheckboxModule} from "@angular/material/checkbox";



@NgModule({
  declarations: [
    DoctorHomeComponent,
    ClinicSignupComponent,
    ClinicLoginComponent,
    AddDoctorComponent,
    ManageDoctorsComponent,
    EditDoctorComponent
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
    FormsModule,
    MatIconModule,
    MatDialogModule,
    NgbPagination,
    MatTooltipModule,
    MatCheckboxModule
  ]
})
export class ClinicModule { }
