import {Component, OnInit, ViewChild} from '@angular/core';
import {Student} from '../../models/student';
import {StudentService} from '../../services/student.service';
import {ActivatedRoute, Router} from '@angular/router';
import * as _ from 'lodash';
import {NgForm} from '@angular/forms';
import {Opinion} from '../../models/opinion';
import {OpinionService} from '../../services/opinion.service';

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
  opinions: Opinion[];

  constructor(private studentDataService: StudentService,
              private opinionService: OpinionService,
              private  router: Router, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.studentId = Number(this.route.params.subscribe(params => {
      let id;
      if (params.id) {
        id = params.id;
        console.log(id);
        this.retrieveCommentsByStudentId(id);
        this.retrieveStudentByStudentId(id);
        this.isEditMode = false;
      } else if (params.userId && params.studentId) {
        const userId = params.userId;
        id = params.studentId;
        console.log(userId);
        console.log(id);
        this.retrieveCommentsByStudentId(id);
        this.retrieveStudentByUserIdAndStudentId(userId, id);
        this.isEditMode = true;
        this.userId = userId;
      }
      return id;
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

  retrieveCommentsByStudentId(studentId): void {
    this.opinionService.getAllOpinionsByStudentId(studentId).subscribe((response: any) => {
      console.log(response);
      this.opinions = response.content;
    });
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
