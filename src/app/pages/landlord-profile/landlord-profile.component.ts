import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Landlord} from '../../models/landlord';
import {LandlordService} from '../../services/landlord.service';
import {ActivatedRoute, Router} from '@angular/router';
import * as _ from 'lodash';

@Component({
  selector: 'app-landlord-profile',
  templateUrl: './landlord-profile.component.html',
  styleUrls: ['./landlord-profile.component.css']
})
export class LandlordProfileComponent implements OnInit {
  @ViewChild('landlordForm', {static: false})
  landlordForm: NgForm;
  landlordData: Landlord = new Landlord();
  landlordId: number;
  isEditMode = false;
  constructor(private landlordDataService: LandlordService,
              private router: Router, private route: ActivatedRoute) {
  //  this.landlordData = {} as Landlord;
  }

  ngOnInit(): void {
    this.landlordId = Number(this.route.params.subscribe(params => {
      let id;
      if (params.id) {
        id = params.id;
        console.log(id);
        this.retrieveLandlordByLandlordId(id);
        this.isEditMode = false;
      }
      return id;
    //  this.retrieveLandlordByLandlordId(2);
   }));
  }
  retrieveLandlordByLandlordId(id): void {
    this.landlordDataService.getLandlordById(id)
      .subscribe((response: Landlord) => {
        this.landlordData = {} as Landlord;
        this.landlordData = _.cloneDeep(response);
        console.log(response);
        console.log(this.landlordData);
      });
  }
  updateLandlord(): void {
    this.landlordDataService.updateLandlord(this.landlordData.id, this.landlordData as Landlord);
  }
  onSubmit(): void {
    if (this.landlordForm.form.valid) {
      console.log(this.landlordData);
      if (this.isEditMode) {
        this.updateLandlord();
      }
    } else {
      console.log('Invalid Data');
    }
  }
}
