import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:'',
    loadChildren:()=>import('./client/client.module').then(m => m.ClientModule)
  },

  {
    path:'clinic',
    loadChildren:()=>import('./clinic/clinic.module').then(m => m.ClinicModule)
  },

  {
    path:'admin',
    loadChildren:()=>import('./admin/admin.module').then(m => m.AdminModule)
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
