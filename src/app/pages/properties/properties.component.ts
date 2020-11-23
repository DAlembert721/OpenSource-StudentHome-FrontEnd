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
  id: number;
  type: any;
  imgUrl = 'https://source.unsplash.com/1600x900/?bedroom,house';
  properties: Property[] = [];
  constructor(private propertyDataService: PropertyService,
              private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    // this.landlordId = Number(this.route.snapshot.paramMap.get('landlordId'));
    this.id = Number(localStorage.getItem('id'));
    this.retrievePropertiesByLandlordId(this.id);
    this.type = localStorage.getItem('type');
  }
  retrievePropertiesByLandlordId(id): void {
    this.propertyDataService.getPropertiesByLandlordId(id)
      .subscribe((response: any) => {
        this.properties = response.content;
      });
  }
  navigateToAddProperty(): void {
    if (this.type === 'landlord') {
      this.router.navigate([`/landlords/${this.id}/properties/add`]).then(() => null);
    }
  }
  navigateToPropertyDetails(element: Property): void {
    this.propertyId = element.id;
    this.router.navigate([`/landlords/${this.id}/properties/${this.propertyId}`]).then(() => null);
  }
}

