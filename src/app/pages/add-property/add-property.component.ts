import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {PropertyService} from '../../services/property.service';
import { Router, ActivatedRoute} from '@angular/router';
import {Property} from '../../models/property';
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
  propertyData: Property = new Property();
  constructor(private propertyDataService: PropertyService,
              private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.landlordId = Number(this.route.snapshot.paramMap.get('landlordId'));
  }
  addProperty(): void {
    const newProperty = {
      rooms: this.propertyData.rooms,
      size: this.propertyData.size,
      cost: this.propertyData.cost,
      active: true,
      address: this.propertyData.address,
      place: 100,
      landlordId: this.landlordId
    };
    this.propertyDataService.createProperty(this.landlordId, newProperty)
      .subscribe(() => {
        this.navigateToProperties();
      });
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
