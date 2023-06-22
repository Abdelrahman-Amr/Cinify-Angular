import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {ClientHomeComponent} from "./components/client-home/client-home.component";
import {ClientLoginComponent} from "./components/client-login/client-login.component";
import {ClientSignupComponent} from "./components/client-signup/client-signup.component";
import { SearchResultComponent } from './components/search-result/search-result.component';
import { ClientCheckoutComponent } from './components/client-checkout/client-checkout.component';



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
  },
  {
    path:'doctor',
    component:SearchResultComponent
  },
  {
    path:'checkout',
    component:ClientCheckoutComponent
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
