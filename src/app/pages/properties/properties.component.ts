import {Component, OnInit, ViewChild} from '@angular/core';
import { Property } from '../../models/property';
import { PropertyService } from '../../services/property.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-property-register',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.css']
})
export class PropertiesComponent implements OnInit {
  @ViewChild('propertyForm', {static: false})
  propertyData: Property;
  propertyId: number;
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
  navigateToPropertyDetails(element: Property): void {
    this.propertyId = element.id;
    this.router.navigate([`/landlords/${this.landlordId}/properties/${this.propertyId}`]).then(() => null);
  }
}

