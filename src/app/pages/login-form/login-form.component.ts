import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  loginForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private userDataService: UserService,
              private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(4)]]
    });
  }
  onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }
    console.log(this.loginForm.value);
  }
  navigateToRegister(): void {
    this.router.navigate([`/register`]).then(() => null);
  }
  clickOnLogin(): void {
    this.router.navigate([`/landlords`]).then(() => null);
  }
}
