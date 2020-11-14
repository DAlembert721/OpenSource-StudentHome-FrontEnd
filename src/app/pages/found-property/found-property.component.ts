import {Component, OnInit, ViewChild} from '@angular/core';
import {Property} from "../../models/property";
import {PropertyService} from "../../services/property.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Service} from "../../models/service";
import {ServiceService} from "../../services/service.service";
import * as _ from 'lodash';

@Component({
  selector: 'app-found-property',
  templateUrl: './found-property.component.html',
  styleUrls: ['./found-property.component.css']
})
export class FoundPropertyComponent implements OnInit {

  propertyData: Property;
  studentId: number;
  propertyId: number;
  services: Service[] = [];
  constructor(private propertyDataService: PropertyService,
              private serviceDataService: ServiceService,
              private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.propertyId = Number(this.route.snapshot.paramMap.get('propertyId'));
    this.propertyId = Number(this.route.snapshot.paramMap.get('studentId'));
    this.getPropertyById(this.propertyId);
    this.getServicesByPropertyId(this.propertyId);
  }
  getPropertyById(id): void {
    this.propertyDataService.getPropertyById(id)
      .subscribe((response: Property) => {
        this.propertyData = {} as Property;
        this.propertyData = _.cloneDeep(response);
        console.log(response);
        console.log(this.propertyData);
      });
  }
  getServicesByPropertyId(id): void {
    this.serviceDataService.getServiceByPropertyId(id)
      .subscribe((response: any) => {
        this.services = response.content;
      });
  }
  navigateToSentRequest(): void {
    this.router.navigate([`/students/${this.studentId}/requests`]).then(() => null);
  }
}
