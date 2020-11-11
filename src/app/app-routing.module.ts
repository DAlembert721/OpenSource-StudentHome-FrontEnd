import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {StudentProfileComponent} from './pages/student-profile/student-profile.component';
import {RequestListComponent} from './pages/request-list/request-list.component';
import {ContractListComponent} from './pages/contract-list/contract-list.component';

const routes: Routes = [
  { path: 'students/:id', component: StudentProfileComponent},
  { path: 'users/:userId/students/:studentId', component: StudentProfileComponent},
  { path: 'students/:id/requests', component: RequestListComponent},
  { path: 'landlords/:id/requests', component: RequestListComponent},
  { path: 'students/:id/contracts', component: ContractListComponent},
  { path: 'landlords/:id/contracts', component: ContractListComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
