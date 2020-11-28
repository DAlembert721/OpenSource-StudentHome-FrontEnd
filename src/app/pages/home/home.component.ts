import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  type: string;
  constructor() { }

  ngOnInit(): void {
    this.type = localStorage.getItem('type');
    if (!this.type){
      this.type = null;
    }
  }

  changeStudent(): void {
    this.type = 'student';
    localStorage.setItem('type', this.type);
    localStorage.setItem('id', '251');
    localStorage.setItem('userId', '101');
  }
  changeLandlord(): void {
    this.type = 'landlord';
    localStorage.setItem('type', this.type);
    localStorage.setItem('id', '61');
    localStorage.setItem('userId', '51');
    localStorage.setItem('subscription', 'Premium');
  }
}
