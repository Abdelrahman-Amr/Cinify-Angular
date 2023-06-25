import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {ClientHomeComponent} from "./components/client-home/client-home.component";
import {ClientLoginComponent} from "./components/client-login/client-login.component";
import {ClientSignupComponent} from "./components/client-signup/client-signup.component";
import { SearchResultComponent } from './components/search-result/search-result.component';
import { ClientCheckoutComponent } from './components/client-checkout/client-checkout.component';
import { ClientAppointmentComponent } from './components/client-appointment/client-appointment.component';
import {AuthGuard} from "../shared/services/auth.guard";


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
    path:'login/:isCheckout',
    component:ClientLoginComponent
  },
  {
    path:'signup',
    component:ClientSignupComponent
  },
  {
    path:'doctor',
    component:SearchResultComponent,
    data:{
      name:'home'
    }
  },
  {
    path:'checkout',
    component:ClientCheckoutComponent,
    canActivate: [AuthGuard],
    data:{
      name:'client',
      isCheckout:'true'
    }
  }
,
{
  path:'doctor/:spectialies/:area',
  component:SearchResultComponent
},
{
  path:'appointment',
  component:ClientAppointmentComponent,
  canActivate: [AuthGuard],
  data:{
    name:'client'
  }
},
];
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class ClientRoutingModule { }
