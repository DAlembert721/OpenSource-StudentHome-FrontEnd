import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, NgForm} from '@angular/forms';
import {PropertyService} from '../../services/property.service';
import { Router, ActivatedRoute} from '@angular/router';
import {Property} from '../../models/property';
import {Observable} from 'rxjs';
import {Region} from '../../models/region';
import {Province} from '../../models/province';
import {District} from '../../models/district';
import {map, startWith} from 'rxjs/operators';
import {LocationService} from '../../services/location.service';

@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.css']
})
export class AddPropertyComponent implements OnInit {
  @ViewChild('propertyForm', { static: false })
  isEdit: boolean;
  actualDate = Date();
  propertyForm: NgForm;
  propertyId: number;
  landlordId: number;
  selectedRegion: Region;
  selectedProvince: Province;
  selectedDistrict: District;
  regions: Region[] = [];
  provinces: Province[] = [];
  districts: District[] = [];
  propertyData: Property = new Property();
  currentFile: File;
  fileName: string;
  imgUrls = ['https://source.unsplash.com/1600x900/?bedroom',
  'https://source.unsplash.com/1600x900/?bedroom,house',
  'https://source.unsplash.com/1600x900/?bed',
  'https://source.unsplash.com/1600x900/?bathroom',
  'https://source.unsplash.com/1600x900/?bedroom,home'];
  services: string[] = ['Cable', 'Netflix', 'Internet 4G', 'Estacionamiento', 'Baño propio'];
  saveImgs: string[] = [];
  selectedImg: string;
  constructor(private propertyDataService: PropertyService,
              private locationService: LocationService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.landlordId = Number(this.route.snapshot.paramMap.get('landlordId'));
    this.retrieveRegions();
    this.propertyId = Number(this.route.snapshot.paramMap.get('propertyId'));
    console.log(this.propertyId);
  }
  ngAfterViewInit(): void {
    setTimeout(() => {
      if ( this.propertyId === 0) {
        this.isEdit = false; }
    else {
      this.isEdit = true;
      this.retrieveProperty();
    }});
    console.log(this.isEdit);
  }
  retrieveProperty(): void {
    this.propertyDataService.getPropertyById(this.propertyId)
      .subscribe((response: any) => {
        this.propertyData = response.content;
      });
  /*No se puede acceder al servicio*/
    this.propertyData = {
      id: 1, landLordId: 61,
      landLordFirstName: 'Landlord',
      landLordLastName: 'Properties Owner',
      rooms: 4, size: 300, cost: 750,
      active: true,
      address: 'Somewere',
      title: 'Title',
      description: 'Description',
      place: 1
    };
  }
  retrieveRegions(): void {
    this.locationService.getRegionById()
      .subscribe((response: any) => {
        this.regions = response.content;
      });
  }
  retrieveProvinces(regionId): void {
    this.locationService.getProvincesByRegionId(regionId)
      .subscribe((response: any) => {
        this.provinces = response.content;
      });
  }
  retrieveDistricts(provinceId): void {
    this.locationService.getDistrictsByProvinceId(provinceId)
      .subscribe((response: any) => {
        this.districts = response.content;
      });
  }
  addOrUpdateProperty(): void {
    const newProperty = {
      rooms: this.propertyData.rooms,
      size: this.propertyData.size,
      cost: this.propertyData.cost,
      active: true,
      address: this.propertyData.address,
      title: this.propertyData.title,
      description: this.propertyData.description,
      place: this.selectedDistrict.id,
    };
    console.log(this.landlordId);
    if (!this.isEdit) {
      this.propertyDataService.createProperty(this.landlordId, newProperty)
        .subscribe((response: any) => {
          console.log(response);
          this.navigateToProperties();
        });
    }
    else {
      this.propertyDataService.updateProperty(this.landlordId, newProperty)
        .subscribe((response: any) => {
          console.log(response);
          this.navigateToProperties();
        });
    }
    // this.navigateToProperties();
  }
  navigateToProperties(): void {
    this.router.navigate([`/home`]).then(() => null);
  }
  onSubmit(): void {
    if (this.propertyForm.form.valid) {
      console.log(this.propertyData);
      this.addOrUpdateProperty();
    } else {
      console.log('Invalid Data');
    }
  }
  onFileUpload(event): void{
    this.currentFile = event.target.files[0];
    this.fileName = this.currentFile.name;
    this.saveImgs.push(this.imgUrls[this.saveImgs.length]);
    console.log(this.fileName);
  }
  changeImage(imgUrl): void{
    this.selectedImg = imgUrl;
  }
  deleteImage(img): void{
    this.saveImgs.pop();
    console.log('deleting image');
  }
}
