import {Component, OnInit, ViewChild} from '@angular/core';
import { Property } from '../../models/property';
import { PropertyService } from '../../services/property.service';
import {ActivatedRoute, Router} from '@angular/router';
import {toNumbers} from '@angular/compiler-cli/src/diagnostics/typescript_version';

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
  contentStyle: any;
  properties: Property[] = [];
  constructor(private propertyDataService: PropertyService,
              private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    // this.landlordId = Number(this.route.snapshot.paramMap.get('landlordId'));
    this.landlordId = Number(localStorage.getItem('id'));
    this.retrievePropertiesByLandlordId(this.landlordId);
  }
  styleConstructor(): void {
    const height = this.properties.length * 190;
    this.contentStyle = `height: ${height}px; `;
  }
  retrievePropertiesByLandlordId(id): void {
    this.propertyDataService.getPropertiesByLandlordId(id)
      .subscribe((response: any) => {
        this.properties = response.content;
        this.styleConstructor();
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

