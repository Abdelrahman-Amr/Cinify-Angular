import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {ClientHomeComponent} from "./components/client-home/client-home.component";
import {ClientLoginComponent} from "./components/client-login/client-login.component";
import {ClientSignupComponent} from "./components/client-signup/client-signup.component";



const routes: Routes = [
  {
    path:'',
    component:ClientHomeComponent
  },
  {
    path:'login',
    component:ClientLoginComponent
  },
  {
    path:'signup',
    component:ClientSignupComponent
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
