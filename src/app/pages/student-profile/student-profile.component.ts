import {Component, OnInit, ViewChild} from '@angular/core';
import {Student} from '../../models/student';
import {StudentService} from '../../services/student.service';
import {ActivatedRoute, Router} from '@angular/router';
import * as _ from 'lodash';
import {NgForm} from '@angular/forms';
@Component({
  selector: 'app-student-profile',
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.css']
})
export class StudentProfileComponent implements OnInit {

  @ViewChild('studentForm', {static: false})
  studentForm: NgForm;
  studentData: Student = new Student();
  studentId: number;
  isEditMode = false;
  userId: number;
  constructor(private studentDataService: StudentService, private  router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.studentId = Number(this.route.params.subscribe(params => {
      if (params.id) {
        const id = params.id;
        console.log(id);
        this.retrieveStudentByStudentId(id);
        this.isEditMode = false;
        return id;
      }
      else if (params.userId && params.studentId) {
        const userId = params.userId;
        const id = params.studentId;
        console.log(userId);
        console.log(id);
        this.retrieveStudentByUserIdAndStudentId(userId, id);
        this.isEditMode = true;
        this.userId = userId;
        return id;
      }
    }));
  }
  retrieveStudentByStudentId(id): void {
    this.studentDataService.getStudentByStudentId(id)
      .subscribe((response: Student) => {
        this.studentData = {} as Student;
        this.studentData = _.cloneDeep(response);
        console.log(response);
        console.log(this.studentData);
      });
  }
  retrieveStudentByUserIdAndStudentId(userId, studentId): void {
    this.studentDataService.getStudentByUserIdAndStudentId(userId, studentId)
      .subscribe((response: Student) => {
        this.studentData = {} as Student;
        this.studentData = _.cloneDeep(response);
        console.log(response);
        console.log(this.studentData);
      });
  }
  updateStudent(): void {
    this.studentDataService.updateStudent(this.userId, this.studentData.id, this.studentData as Student);
  }
  onSubmit(): void {
    if (this.studentForm.form.valid) {
      console.log(this.studentData);
      if (this.isEditMode) {
        this.updateStudent();
      }
    } else {
      console.log('Invalid Data');
    }
  }
}
