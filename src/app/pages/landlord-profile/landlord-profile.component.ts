import {Component, OnInit, ViewChild} from '@angular/core';
import {Landlord} from '../../models/landlord';
import {LandlordService} from '../../services/landlord.service';
import {ActivatedRoute, Router} from '@angular/router';
import * as _ from 'lodash';
import {NgForm} from '@angular/forms';


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
  userId: number;

  constructor(private landlordDataService: LandlordService,
              private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.landlordId = Number(this.route.params.subscribe(params => {
      let id;
      if (params.id) {
        id = params.id;
        console.log(id);
        this.retrieveLandlordByLandlordId(id);
        // this.isEditMode = false;
      } else
      if (params.userId && params.landlordId) {
        const userId = params.userId;
        id = params.landlordId;
        console.log(userId);
        console.log(id);
        this.retrieveLandlordByUserIdAndLandlordId(userId, id);
 //       this.isEditMode = true;
        this.userId = userId;
      }
      return id;
    }));
  }

  retrieveLandlordByLandlordId(id): void {
    this.landlordDataService.getLandlordByLandlordId(id)
      .subscribe((response: Landlord) => {
        this.landlordData = {} as Landlord;
        this.landlordData = _.cloneDeep(response);
        console.log(response);
        console.log(this.landlordData);
      });
  }

  retrieveLandlordByUserIdAndLandlordId(userId, landlordId): void {
    this.landlordDataService.getLandlordByUserIdAndLandlordId(userId, landlordId)
      .subscribe((response: Landlord) => {
        this.landlordData = {} as Landlord;
        this.landlordData = _.cloneDeep(response);
        console.log(response);
        console.log(this.landlordData);
      });
  }

  updateLandlord(): void {
    this.landlordDataService.updateLandlord(this.userId, this.landlordData.id, this.landlordData as Landlord);
  }
  navigateToLandlordProperties(landlordId): void{
    this.router.navigate([`/landlords/${landlordId}/properties`]).then(() => null);
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
