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
import { MatSnackBarModule} from "@angular/material/snack-bar";
import {ClinicSearchComponent} from "./components/clinic-search/clinic-search.component";
import {SpecialtiesComponent} from "./components/client-home/specialties/specialties.component";
import {ClientSignupComponent} from "./components/client-signup/client-signup.component";
import {FeaturesComponent} from "./components/client-home/features/features.component";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {MatRadioModule} from "@angular/material/radio";
import {SharedModule} from "../shared/shared.module";
import { SearchResultComponent } from './components/search-result/search-result.component';
import { CardComponent } from './components/search-result/card/card.component';
import { FilterComponent } from './components/search-result/filter/filter.component';



@NgModule({
  declarations: [
    ClientHomeComponent,
    ClientLoginComponent,
    ClinicSearchComponent,
    SpecialtiesComponent,
    FeaturesComponent,
    ClientSignupComponent,
    SearchResultComponent,
    CardComponent,
    FilterComponent,
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
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatSelectModule,
    SharedModule

  ],
  providers:[MatDatepickerModule]
})
export class ClientModule { }
