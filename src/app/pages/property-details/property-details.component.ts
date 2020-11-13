import { Component, OnInit } from '@angular/core';
import {PropertyService} from '../../services/property.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Property} from '../../models/property';
import {Landlord} from '../../models/landlord';
import * as _ from 'lodash';

@Component({
  selector: 'app-property-details',
  templateUrl: './property-details.component.html',
  styleUrls: ['./property-details.component.css']
})
export class PropertyDetailsComponent implements OnInit {
  propertyData: Property;
  propertyId: number;
  constructor(private propertyDataService: PropertyService,
              private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.propertyId = Number(this.route.snapshot.paramMap.get('propertyId'));
    this.retrievePropertyById(this.propertyId);
  }
  retrievePropertyById(id): void {
    this.propertyDataService.getPropertyById(id)
      .subscribe((response: Property) => {
        this.propertyData = {} as Property;
        this.propertyData = _.cloneDeep(response);
        console.log(response);
        console.log(this.propertyData);
      });
  }

}
