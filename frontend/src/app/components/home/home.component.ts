import { SchoolService } from './../../services/school-service.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {Subject} from '../../models/subject';
import {MAT_DIALOG_DATA,  MatDialogRef} from '@angular/material/dialog';
import {Student} from '../../models/student';
import {AddStudentComponent} from '../add-student/add-student.component';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private schoolService: SchoolService, private router: Router, public dialog: MatDialog, private formBuilder: FormBuilder) {
    this.subjectForm = this.formBuilder.group({
      name: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern(/[A-Z][^#&<>"~;$^%{}?]{1,20}$/)
      ]))
    });

    this.studentForm = this.formBuilder.group({
      name: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern(/[A-Z][^#&<>"~;$^%{}?]{1,20}$/)
      ])),

      address: new FormControl('', Validators.compose([
        Validators.required
      ])),

      phoneHome: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern(/\(?([0-9]{2})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/)
      ])),

      phoneWork: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern(/\(?([0-9]{2})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/)
      ])),
    });
   }

  subjects: Subject[];
  currentSubj: Subject;
  currentStud: Student;
  subjectForm: FormGroup;
  studentForm: FormGroup;
  subjectName: String;
  student: Student;
  students: Student[];
  validation_messages: any;

  private static handleError(err: HttpErrorResponse) {
    if (err.status === 500){
      alert('There was an error creating the subject');
    }
  }

  ngOnInit(): void {
    let student = new Student();
    this.updateInfo();
    this.validation_messages = {
      name: [
        {type: 'required', message: 'You must give a name'},
        {type: 'pattern', message: 'The first letter must be in capital and between 1 abd 20 characters'},
        {type: 'error', message: 'The subject name must be unique' }
      ],
      address: [
        { type: 'required', message: 'Address is required' }
      ],
      phoneHome: [
        { type: 'required', message: 'Phone Home is required' },
        { type: 'pattern', message: 'Number must be valid' },
        { type: 'error', message: 'Internal Server Error' }
      ],
      phoneWork: [
        { type: 'required', message: 'Phone Work is required' },
        { type: 'pattern', message: 'Number must be valid' },
      ]
    };

  }

  updateInfo(){
    this.schoolService.getSubjects().subscribe(subjects => {this.subjects = subjects});
  }

  public studentSelect(student){
    this.currentStud = student;
  }

  public subjectSelect(subject){
    this.currentSubj = subject;
  }

  public addStudent(){
    const dialogRef = this.dialog.open(AddStudentComponent, {
      width: '50%',
      height: '70%',
    });
    dialogRef.afterClosed().subscribe(data => {
      console.log(data);
      if (data) {
        data.forEach(async(student) => {
          await this.schoolService.addStudent(this.currentSubj._id, student._id).toPromise();
          this.updateInfo();
        });
      }
    });

  }

  public addSubject(){
    let subject = new Subject();
    console.log(this.subjectName);
    subject.name = this.subjectName;
    console.log(this.subjectName);
    this.schoolService.addSubject(subject)
      .subscribe(res => {
        console.log('Res: ' + res);
        this.updateInfo();
      },
      err => {
        console.log(err);
        HomeComponent.handleError(err);
      });
  }

  public getByStudies(studies){
    console.log(studies);
    this.schoolService.getStudentsByStudies(studies).subscribe(students => {this.students = students});
  }

}
