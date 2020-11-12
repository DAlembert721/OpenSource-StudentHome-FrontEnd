import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  state = true;
  id: string;
  type: string;
  options: Array<any>;
  constructor(private router: Router) {this.initializeOptions(); }

  ngOnInit(): void {
    this.id = localStorage.getItem('id');
    this.type = localStorage.getItem('type');
    console.log('here');
  }
  initializeOptions(): void {
    this.options = [];
    this.options.push({text: 'Home', icon: 'home'});
    this.options.push({text: 'Profile', icon: 'perm_identity'});
    this.options.push({text: 'Contracts', icon: 'book'});
    this.options.push({text: 'Requests', icon: 'receipt'});
    console.log(this.options);
  }
  redirectOption(option): void {
    console.log(option)
    if (option.text === 'Home') {
      this.router.navigate(['/home']).then(() => null);
    }else if (option.text === 'Profile') {
      if (this.type === 'student') {
        this.router.navigate([`students/${this.id}`]).then(() => null);
      }
      else {
        this.router.navigate([`landlords/${this.id}`]).then(() => null);
      }
    }else if (option.text === 'Contracts') {
      if (this.type === 'student') {
        this.router.navigate([`students/${this.id}/contracts`]).then(() => null);
      }
      else {
        this.router.navigate([`landlords/${this.id}/contracts`]).then(() => null);
      }
    }else if (option.text === 'Requests') {
      if (this.type === 'student') {
        this.router.navigate([`students/${this.id}/requests`]).then(() => null);
      }
      else {
        this.router.navigate([`landlords/${this.id}/requests`]).then(() => null);
      }
    }
  }

}
