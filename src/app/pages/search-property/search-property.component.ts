import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {MatTableDataSource} from '@angular/material/table';
import {Property} from '../../models/property';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {PropertyService} from '../../services/property.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Service} from '../../models/service';
import {Region} from '../../models/region';
import {Province} from '../../models/province';
import {District} from '../../models/district';
import {ServiceService} from '../../services/service.service';
import {LocationService} from '../../services/location.service';

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
  displayedColumns: string[] = ['title', 'description', 'cost', 'size', 'rooms', 'view'];
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
  selectable = true;
  removable = true;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private propertyDataService: PropertyService,
              private serviceDataService: ServiceService,
              private locationService: LocationService,
              private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.studentId = Number(this.route.snapshot.paramMap.get('id'));
    this.dataSource.sort = this.sort;
    this.getAllProperties();
    for (let i = 0; i < this.services.length; i++) {
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
    this.propertyDataService.getProperty()
      .subscribe((response: any) => {
        this.dataSource.data = response;
      });
  }

  navigateToPropertyDetails(element: Property): void {
    this.router.navigate([`students/${this.studentId}/search-properties/${element.id}`]).then(() => null);
  }
  filter(): void{
    this.filterByCost();
    this.filterBySize();
    this.filterByRooms();
    this.filterByAddress();
    for (let i = 0; i < this.servicesSelected.length; i++) {
      if (this.servicesSelected[i] === true) {
        this.filterByService(this.services[i].id);
      }
    }
  }

  onSubmit(): void{
    if (this.propertyForm.form.valid) {
      this.filter();
    }
    else {
      console.log('Invalid Data');
    }
  }

  filterByCost(): void{}
  filterBySize(): void{}
  filterByRooms(): void{}
  filterByAddress(): void{}
  filterByService(val: any): void{
    this.propertyDataService.getPropertyById(val).subscribe((response: any) => {
      this.properties.concat(response.content);
    });
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
  removeSelectedDistrict(district): void{
    const index = this.districts.indexOf(district);
    if (index >= 0) {
      this.districts.splice(index, 1);
    }
  }
}
