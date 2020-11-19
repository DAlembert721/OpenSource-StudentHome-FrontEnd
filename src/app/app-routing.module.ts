import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LandlordProfileComponent} from './pages/landlord-profile/landlord-profile.component';
import {PropertiesComponent} from './pages/properties/properties.component';
import {AddPropertyComponent} from './pages/add-property/add-property.component';
import {PropertyDetailsComponent} from './pages/property-details/property-details.component';
import {StudentProfileComponent} from './pages/student-profile/student-profile.component';
import {RequestListComponent} from './pages/request-list/request-list.component';
import {ContractListComponent} from './pages/contract-list/contract-list.component';
import {SearchPropertyComponent} from "./pages/search-property/search-property.component";
import {FoundPropertyComponent} from "./pages/found-property/found-property.component";
import {HomeComponent} from './pages/home/home.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent},
  { path: 'landlords/:id', component: LandlordProfileComponent },
  { path: 'users/:userId/landlords/:landlordId', component: LandlordProfileComponent},
  // { path: 'landlords/:landlordId/properties', component: PropertiesComponent},
  { path: 'landlords/:landlordId/properties/add', component: AddPropertyComponent},
  { path: 'landlords/:landlordId/properties/:propertyId', component: PropertyDetailsComponent},
  { path: 'students/:id', component: StudentProfileComponent},
  { path: 'users/:userId/students/:studentId', component: StudentProfileComponent},
  { path: 'students/:id/requests', component: RequestListComponent},
  { path: 'landlords/:id/requests', component: RequestListComponent},
  { path: 'students/:id/contracts', component: ContractListComponent},
  { path: 'landlords/:id/contracts', component: ContractListComponent},
  { path: 'students/:id/search-properties', component: SearchPropertyComponent},
  { path: 'students/:id/search-properties/:propertyId', component: FoundPropertyComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
