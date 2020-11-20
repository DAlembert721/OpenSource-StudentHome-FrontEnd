import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../services/user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {LandlordService} from '../../services/landlord.service';
import {StudentService} from '../../services/student.service';
import {User} from '../../models/user';
import {Account} from '../../models/account';
import {Student} from '../../models/student';
import {Landlord} from '../../models/landlord';
import {AccountService} from '../../services/account.service';
@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {
  registerForm: FormGroup;
  userData: User = new User();
  accountData: Account = new Account();
  studentData: Student = new Student();
  landlordData: Landlord = new Landlord();
  selectedUser: string;
  isStudent = true;
  constructor(private formBuilder: FormBuilder, private userDataService: UserService,
              private accountDataService: AccountService, private landlordDataService: LandlordService,
              private studentDataService: StudentService, private router: Router,
              private route: ActivatedRoute) { }
  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(4)]],
      firstName: [null, [Validators.required, Validators.minLength(2)]],
      lastName: [null, [Validators.required, Validators.minLength(2)]],
      dni: [null, [Validators.required, Validators.minLength(8)]],
      phone: [null, [Validators.required, Validators.minLength(9)]],
      address: [null, [Validators.required, Validators.minLength(5)]]
    });
    this.selectedUser = 'None';
  }
  onSubmit(): void {
    if (this.registerForm.invalid) {
      return;
    }
    console.log(this.registerForm.value);
  }
  addUser(): void {
    const newUser = {
      email: this.userData.email,
      password: this.userData.password
    };
    this.userDataService.createUser(newUser)
      .subscribe((response: any) => {
        console.log(response);
      });
    const newAccount = {
      firstName: this.accountData.firstName,
      lastName: this.accountData.lastName,
      dni: this.accountData.dni,
      phone: this.accountData.phone,
      description: 'Hello, this is my description',
      image: 'image.jpg',
      userId: 3
    };
    this.accountDataService.createAccount(newAccount.userId, newAccount)
      .subscribe((response: any) => {
      console.log(response);
    });
    if (this.isStudent) {
      const newStudent = {
        firstName: newAccount.firstName,
        lastName: newAccount.lastName,
        dni: newAccount.dni,
        phone: newAccount.phone,
        image: newAccount.image,
        description: newAccount.description,
        address: this.studentData.address,
        userId: newAccount.userId
      };
      this.studentDataService.createStudent(newAccount.userId, newStudent)
        .subscribe((response: any) => {
        console.log(response);
        this.navigateToLogin();
      });
    }
    else {
      const newLandlord = {
        firstName: newAccount.firstName,
        lastName: newAccount.lastName,
        dni: newAccount.dni,
        phone: newAccount.phone,
        email: newUser.email,
        description: newAccount.description,
        userId: newAccount.userId
      };
      this.landlordDataService.createLandlord(newAccount.userId, newLandlord)
        .subscribe((response: any) => {
        console.log(response);
        this.navigateToLogin();
      });
    }
  }
  navigateToLogin(): void {
    this.router.navigate([`/login`]).then(() => null);
  }
  selectStudent(): void {
    this.isStudent = true;
    this.registerForm.controls.address.enable();
  }
  selectLandlord(): void {
    this.isStudent = false;
    this.registerForm.controls.address.disable();
  }
}
