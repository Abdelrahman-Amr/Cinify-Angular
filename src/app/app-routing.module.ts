import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:'',
    loadChildren:()=>import('./client/client.module').then(m => m.ClientModule)
  },

  {
    path:'doctor',
    loadChildren:()=>import('./doctor/doctor.module').then(m => m.DoctorModule)
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
