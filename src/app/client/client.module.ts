import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ClientRoutingModule} from "./client-routing.module";
import { ClientHomeComponent } from './components/client-home/client-home.component';
import {MatIconModule} from "@angular/material/icon";
import {MatDividerModule} from "@angular/material/divider";
import {MatButtonModule} from "@angular/material/button";
import { ClientLoginComponent } from './components/client-login/client-login.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {RouterLink, RouterOutlet} from "@angular/router";
import {MatSnackBar, MatSnackBarModule} from "@angular/material/snack-bar";
import { HeaderComponent } from '../shared/components/header/header.component';
import { FooterComponent } from '../shared/components/footer/footer.component';
import { ClinicSearchComponent } from './components/clinic-search/clinic-search.component';
import { SharedModule } from '../shared/shared.module';
import { SpecialtiesComponent } from './components/client-home/specialties/specialties.component';
import { FeaturesComponent } from './components/client-home/features/features.component';



@NgModule({
  declarations: [
    ClientHomeComponent,
    ClientLoginComponent,
    ClinicSearchComponent,
    SpecialtiesComponent,
    FeaturesComponent
  ],
  imports: [
    CommonModule,
    ClientRoutingModule,
    MatIconModule,
    MatDividerModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    RouterLink,
    RouterOutlet,
    MatSnackBarModule,
    SharedModule
  
  ]
})
export class ClientModule { }
