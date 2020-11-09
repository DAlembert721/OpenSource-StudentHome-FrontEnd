import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LandlordProfileComponent} from './pages/landlord-profile/landlord-profile.component';
import {PropertiesComponent} from './pages/properties/properties.component';
import {AddPropertyComponent} from './pages/add-property/add-property.component';

const routes: Routes = [
  {path: '', redirectTo: '/landlords/1', pathMatch: 'full'},
  {path: 'landlords', redirectTo: '/landlords/1', pathMatch: 'full'},
  {path: 'landlords/:id', component: LandlordProfileComponent },
  {path: 'users/:userId/landlords/:landlordId', component: LandlordProfileComponent},
  {path: 'landlords/:landlordId/properties', component: PropertiesComponent},
  {path: 'landlords/:landlordId/properties/add', component: AddPropertyComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
