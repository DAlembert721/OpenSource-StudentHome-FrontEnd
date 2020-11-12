import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LandlordProfileComponent} from './pages/landlord-profile/landlord-profile.component';
import {PropertiesComponent} from './pages/properties/properties.component';
import {AddPropertyComponent} from './pages/add-property/add-property.component';
import {PropertyDetailsComponent} from './pages/property-details/property-details.component';
import {AppComponent} from './app.component';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: '/home', component: AppComponent},
  {path: 'landlords', redirectTo: '/users/61/landlords/101', pathMatch: 'full'},
  {path: 'landlords/:id', component: LandlordProfileComponent },
  {path: 'users/:userId/landlords/:landlordId', component: LandlordProfileComponent},
  {path: 'landlords/:landlordId/properties', component: PropertiesComponent},
  {path: 'landlords/:landlordId/properties/add', component: AddPropertyComponent},
  {path: 'landlords/:landlordId/properties/:propertyId', component: PropertyDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
