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
import { UpdateProfileComponent } from './components/update-profile/update-profile.component';
import { UpdateUserDataComponent } from './components/update-profile/update-user-data/update-user-data.component';
import { UpdatePasswordComponent } from './components/update-profile/update-password/update-password.component';


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
{
  path:'profile',
  component:UpdateUserDataComponent,
},
{
  path:'changePassword',
  component:UpdatePasswordComponent,
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
