import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {StudentProfileComponent} from './pages/student-profile/student-profile.component';

const routes: Routes = [
  { path: 'students/:id', component: StudentProfileComponent},
  { path: 'users/:userId/students/:studentId', component: StudentProfileComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
