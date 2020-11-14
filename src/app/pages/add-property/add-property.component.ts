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
  constructor(private propertyDataService: PropertyService,
              private locationService: LocationService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.landlordId = Number(this.route.snapshot.paramMap.get('landlordId'));
    this.retrieveRegions();
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
  addProperty(): void {
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
    this.propertyDataService.createProperty(this.landlordId, newProperty)
      .subscribe((response: any) => {
        console.log(response);
        this.navigateToProperties();
      });
    // this.navigateToProperties();
  }
  navigateToProperties(): void {
    this.router.navigate([`/landlords/${this.landlordId}/properties`]).then(() => null);
  }
  onSubmit(): void {
    if (this.propertyForm.form.valid) {
      console.log(this.propertyData);
      this.addProperty();
    } else {
      console.log('Invalid Data');
    }
  }
}
