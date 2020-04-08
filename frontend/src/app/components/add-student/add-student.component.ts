import { Student } from './../../models/student';
import { SchoolService } from './../../services/school-service.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { timingSafeEqual } from 'crypto';


@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent implements OnInit {

  students: Student[];
  checked: boolean[] = [];

  constructor(public dialogRef: MatDialogRef<AddStudentComponent>, private schoolService: SchoolService) { }

  ngOnInit(): void {
    this.schoolService.getStudents().subscribe(students => {
      this.students = students;
      this.students.forEach((student, i) => {
        this.checked[i] = false;
      });
    });
  }

  closeDialog(){
    this.dialogRef.close();
  }

  addStudents(){
    let newStudents: Student[] = [];
    this.students.forEach((student,i) => {
      if (this.checked[i]) {
        newStudents.push(student);
      }
    });
    this.dialogRef.close(newStudents);
  }
}
