import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {ClientHomeComponent} from "./components/client-home/client-home.component";



const routes: Routes = [
  {
    path:'',
    component:ClientHomeComponent
  }

];
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class ClientRoutingModule { }
