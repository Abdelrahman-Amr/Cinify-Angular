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



@NgModule({
  declarations: [
    ClientHomeComponent,
    ClientLoginComponent,
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
    RouterOutlet
  ]
})
export class ClientModule { }
