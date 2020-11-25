import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Property} from '../../models/property';
import {MatTableDataSource} from '@angular/material/table';
import {Region} from '../../models/region';
import {Province} from '../../models/province';
import {District} from '../../models/district';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {PropertyService} from '../../services/property.service';
import {LocationService} from '../../services/location.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ServiceService} from '../../services/service.service';
import {Service} from '../../models/service';

@Component({
  selector: 'app-search-property',
  templateUrl: './search-property.component.html',
  styleUrls: ['./search-property.component.css']
})
export class SearchPropertyComponent implements OnInit {

  @ViewChild('propertyForm', { static: false })
  studentId: number;
  propertyForm: NgForm;
  properties: Property[] = [];
  propertyData: Property = new Property();
  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['id', 'active', 'title', 'description', 'rooms', 'size', 'cost', 'address',
    'place', 'landLordId', 'landLordFirstName', 'landLordLastName', 'actions'];
  minCost: number;
  maxCost: number;
  minSize: number;
  maxSize: number;
  minRooms: number;
  maxRooms: number;
  selectedRegion: Region;
  selectedProvince: Province;
  selectedDistrict: District;
  services: Service[] = [];
  regions: Region[] = [];
  provinces: Province[] = [];
  districts: District[] = [];
  servicesSelected: boolean[] = [];
  districtsSelected: District[] = [];
  filteredProperties: Property[] = [];
  selectable = true;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private propertyDataService: PropertyService,
              private locationService: LocationService,
              private serviceService: ServiceService,
              private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.studentId = Number(this.route.snapshot.paramMap.get('id'));
    this.dataSource.sort = this.sort;
    this.getAllProperties();
    this.retrieveAllServices();
    this.retrieveAllRegions();
    for (const service of this.services) {
      this.servicesSelected.push(false);
    }
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  getAllProperties(): void {
    this.propertyDataService.getAllActiveProperties()
      .subscribe((response: any) => {
        this.properties = response.content;
        this.dataSource.data = this.properties;
        // console.log(response.content);
      });
  }
  navigateToPropertyDetails(element: Property): void {
    if (element.active) {
      this.router.navigate([`students/${this.studentId}/properties/${element.id}`]).then(() => null);
    }
  }
  filter(): void{
    this.filteredProperties = [];
    if (this.servicesSelected.length > 0) {
      for (let i = 0; i < this.servicesSelected.length; i++) {
        if (this.servicesSelected[i] === true) {
          this.filterByService(this.services[i].id);
        }
      }
    }else {
      this.filteredProperties = this.properties;
    }
    this.filterByCost();
    this.filterBySize();
    this.filterByRooms();
    this.filterByAddress();
  }

  onSubmit(): void{
    if (this.propertyForm.form.valid) {
      this.filter();
    }
    else {
      console.log('Invalid Data');
    }
  }

  filterByCost(): void{
    for (const property of this.filteredProperties) {
      if (property.cost >= this.minCost && property.cost <= this.maxCost) {
        this.filteredProperties.push(property);
      }
    }

  }
  filterBySize(): void{
    for (const property of this.filteredProperties) {
      if (property.size < this.minSize || property.size > this.maxSize) {
        const index = this.filteredProperties.indexOf(property);
        this.filteredProperties.splice(index, 1);
      }
    }
  }
  filterByRooms(): void{
    for (const property of this.filteredProperties) {
      if (property.rooms < this.minRooms || property.rooms > this.maxRooms) {
        const index = this.filteredProperties.indexOf(property);
        this.filteredProperties.splice(index, 1);
      }
    }
  }
  filterByAddress(): void{
    if (this.selectedDistrict){
      this.filterByDistrict();
    }
    else if (this.selectedProvince){
      this.filterByProvince();
    }else {
      this.filterByRegion();
    }
  }
  filterByRegion(): void{
    for (const property of this.filteredProperties) {
      if (this.selectedRegion.id !== property.regionId) {
        const index = this.filteredProperties.indexOf(property);
        this.filteredProperties.splice(index, 1);
      }
    }
  }
  filterByProvince(): void{
    for (const property of this.filteredProperties) {
      if (this.selectedProvince.id !== property.provinceId) {
        const index = this.filteredProperties.indexOf(property);
        this.filteredProperties.splice(index, 1);
      }
    }
  }
  filterByDistrict(): void{
    for (const property of this.filteredProperties) {
      if (this.selectedDistrict.id !== property.districtId) {
        const index = this.filteredProperties.indexOf(property);
        this.filteredProperties.splice(index, 1);
      }
    }
  }
  filterByService(val: any): void{
    this.propertyDataService.getAllPropertiesByServiceId(val)
      .subscribe((response: any) => {
      this.filteredProperties.concat(response.content);
    });
  }

  retrieveAllRegions(): void {
    this.locationService.getRegionById()
      .subscribe((response: any) => {
        this.regions = response.content;
        console.log(response);
      });
  }
  retrieveProvinces(regionId): void {
    this.locationService.getProvincesByRegionId(regionId)
      .subscribe((response: any) => {
        this.provinces = response.content;
        console.log(response);
      });
  }
  retrieveDistricts(provinceId): void {
    this.locationService.getDistrictsByProvinceId(provinceId)
      .subscribe((response: any) => {
        this.districts = response.content;
        console.log(response);
      });
  }
  removeSelectedDistrict(district): void{
    const index = this.districts.indexOf(district);
    if (index >= 0) {
      this.districts.splice(index, 1);
    }
  }
  retrieveAllServices(): void{
    this.serviceService.getAllServices()
      .subscribe((response: any) => {
        this.services = response.content;
      });
  }
}
