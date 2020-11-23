import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.css']
})
export class SubscriptionComponent implements OnInit {

  plan: string;

  constructor() { }

  ngOnInit(): void {
    this.plan = 'None';
  }
  changePlan(value): void{
    this.plan = value;
    console.log(this.plan);
  }
}
