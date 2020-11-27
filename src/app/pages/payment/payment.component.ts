import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  paymentId: number;
  isView = false;
  constructor(
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.paymentId = Number(this.route.snapshot.paramMap.get('paymentId'));
    console.log(this.paymentId);
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      if ( this.paymentId === 0) {
        this.isView = false; }
      else {
        this.isView = true;
      }});
    console.log(this.isView);
  }
}
