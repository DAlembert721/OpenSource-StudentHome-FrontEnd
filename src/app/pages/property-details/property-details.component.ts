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
  type: any;
  propertyData: Property;
  id: number;
  propertyId: number;
  studentImage = 'https://source.unsplash.com/900x900/?face,young';
  imgUrls = ['https://source.unsplash.com/1600x900/?bedroom',
              'https://source.unsplash.com/1600x900/?bedroom,house',
              'https://source.unsplash.com/1600x900/?bed',
              'https://source.unsplash.com/1600x900/?bathroom',
              'https://source.unsplash.com/1600x900/?bedroom,home'];
  services = ['Cable', 'Netflix', 'Internet 4G', 'Estacionamiento', 'Baño propio'];
  selectedIng: string;
  showQualification = false;
  propertyComments = [
    {createdAt: 'xx-xx-xx xx:xx', score: '900', studentFirstName: 'Hades', studentLastName: 'Hell', comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation'},
    {createdAt: 'xx-xx-xx xx:xx', score: '1900', studentFirstName: 'Persephone', studentLastName: 'Hell SpringGoddess', comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation'},
    {createdAt: 'xx-xx-xx xx:xx', score: '2900', studentFirstName: 'Loki', studentLastName: 'Asgard', comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation'},
    {createdAt: 'xx-xx-xx xx:xx', score: '3900', studentFirstName: 'Thor', studentLastName: 'Asgard', comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation'},
    {createdAt: 'xx-xx-xx xx:xx', score: '4900', studentFirstName: 'Minerva', studentLastName: 'Greek', comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation'},
    {createdAt: 'xx-xx-xx xx:xx', score: '5000', studentFirstName: 'Dionisio', studentLastName: 'Wine', comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation'}
  ];
  constructor(private propertyDataService: PropertyService,
              private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.propertyId = Number(this.route.snapshot.paramMap.get('propertyId'));
    this.retrievePropertyById(this.propertyId);
    this.id = Number(this.route.params.subscribe(params => {
      this.type = localStorage.getItem('type');
      return  params.id; }));
    this.selectedIng = this.imgUrls[0];
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
  changeImage(imgUrl): void{
    this.selectedIng = imgUrl;
  }
  navigateToRequest(): void{
    this.router.navigate([`/students/${this.id}/requests/${this.propertyId}`]).then(() => null);
  }
  navigateToEdit(): void{
    this.router.navigate([`/landlords/${this.id}/properties/${this.propertyId}/edit`]).then(() => null);
  }
}
