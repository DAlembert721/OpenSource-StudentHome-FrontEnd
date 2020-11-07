import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LandlordProfileComponent} from './pages/landlord-profile/landlord-profile.component';
import {PropertyRegisterComponent} from './pages/property-register/property-register.component';

const routes: Routes = [
  // {path: '', redirectTo: '/landlords', pathMatch: 'full'},
  {path: 'landlords/:id', component: LandlordProfileComponent },
  {path: 'properties/*', component: PropertyRegisterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
