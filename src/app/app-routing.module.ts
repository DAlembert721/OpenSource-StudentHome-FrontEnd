import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LandlordProfileComponent} from './pages/landlord-profile/landlord-profile.component';
import {PropertiesComponent} from './pages/properties/properties.component';
import {AddPropertyComponent} from './pages/add-property/add-property.component';
import {PropertyDetailsComponent} from './pages/property-details/property-details.component';
import {StudentProfileComponent} from './pages/student-profile/student-profile.component';
import {RequestListComponent} from './pages/request-list/request-list.component';
import {ContractListComponent} from './pages/contract-list/contract-list.component';
import {HomeComponent} from './pages/home/home.component';
import {RequestFormComponent} from './pages/request-form/request-form.component';
import {ContractComponent} from './pages/contract/contract.component';
import {SearchPropertyComponent} from "./pages/search-property/search-property.component";
import {SubscriptionComponent} from "./pages/subscription/subscription.component";

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent},
  { path: 'landlords/:id', component: LandlordProfileComponent },
  { path: 'users/:userId/landlords/:landlordId', component: LandlordProfileComponent},
  // { path: 'landlords/:landlordId/properties', component: PropertiesComponent},
  { path: 'landlords/:landlordId/properties/add', component: AddPropertyComponent},
  { path: 'landlords/:id/properties/:propertyId', component: PropertyDetailsComponent},
  { path: 'landlords/:id/properties/:propertyId/edit', component: AddPropertyComponent},
  { path: 'students/:id/properties/:propertyId', component: PropertyDetailsComponent},
  { path: 'students/:id', component: StudentProfileComponent},
  { path: 'users/:userId/students/:studentId', component: StudentProfileComponent},
  { path: 'students/:id/requests', component: RequestListComponent},
  { path: 'landlords/:id/requests', component: RequestListComponent},
  { path: 'students/:id/contracts', component: ContractListComponent},
  { path: 'landlords/:id/contracts', component: ContractListComponent},
  { path: 'students/:studentId/requests/:propertyId', component: RequestFormComponent},
  { path: 'landlords/:landlordId/requests/:requestId', component: ContractComponent},
  { path: 'students/:id/search_property', component: SearchPropertyComponent},
  { path: 'landlords/:id/subscription', component: SubscriptionComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
