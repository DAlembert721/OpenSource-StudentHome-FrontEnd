import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Property } from '../../models/property';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { PropertyService } from '../../services/property.service';
import * as _ from 'lodash';
import {LandlordService} from '../../services/landlord.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-property-register',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.css']
})
export class PropertiesComponent implements OnInit {
  @ViewChild('propertyForm', {static: false})
  propertyForm: NgForm;
  // propertyData: Property = new Property();
  propertyData: Property;
  propertyId: number;
  isAddMode = false;
  landlordId: number;
  properties: Array<any>;
  constructor(private propertyDataService: PropertyService,
              private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.landlordId = Number(this.route.snapshot.paramMap.get('landlordId'));
    this.retrievePropertiesByLandlordId(this.landlordId);
  }
  retrievePropertiesByLandlordId(id): void {
    this.propertyDataService.getPropertiesByLandlordId(id)
      .subscribe((response: any) => {
        this.properties = response;
      });
  }
  navigateToAddProperty(): void {
    this.router.navigate([`/landlords/${this.landlordId}/properties/add`]).then(() => null);
  }
}

