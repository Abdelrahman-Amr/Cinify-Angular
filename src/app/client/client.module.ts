import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ClientRoutingModule} from "./client-routing.module";
import { ClientHomeComponent } from './components/client-home/client-home.component';



@NgModule({
  declarations: [
    ClientHomeComponent
  ],
  imports: [
    CommonModule,
    ClientRoutingModule
  ]
})
export class ClientModule { }
