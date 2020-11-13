import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';
import { LandlordProfileComponent } from './pages/landlord-profile/landlord-profile.component';
import { PropertiesComponent } from './pages/properties/properties.component';
import { PropertyDetailsComponent } from './pages/property-details/property-details.component';
import { AddPropertyComponent } from './pages/add-property/add-property.component';
import {MatSelectModule} from '@angular/material/select';
import {StudentProfileComponent} from './pages/student-profile/student-profile.component';
import {MatListModule} from '@angular/material/list';
import { RequestFormComponent } from './pages/request-form/request-form.component';
import { RequestListComponent } from './pages/request-list/request-list.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import { ContractListComponent } from './pages/contract-list/contract-list.component';
import { NavBarComponent } from './pages/nav-bar/nav-bar.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import { HomeComponent } from './pages/home/home.component';
import { PropertiesListComponent } from './pages/properties-list/properties-list.component';

@NgModule({
  declarations: [
    AppComponent,
    LandlordProfileComponent,
    PropertiesComponent,
    PropertyDetailsComponent,
    AddPropertyComponent,
    StudentProfileComponent,
    RequestFormComponent,
    RequestListComponent,
    ContractListComponent,
    NavBarComponent,
    HomeComponent,
    PropertiesListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatGridListModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatInputModule,
    FormsModule,
    HttpClientModule,
    MatGridListModule,
    MatListModule,
    FlexLayoutModule,
    MatSidenavModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
