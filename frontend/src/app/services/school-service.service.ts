import { Environment } from './environment.service';
import { Edit } from './../models/edit';
import { Student } from './../models/student';
import { Subject } from './../models/subject';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SchoolService {

  url: Environment;

  constructor(private http: HttpClient) {
    this.url = new Environment();
  }

  getSubjects(): Observable<Subject[]> {
    return this.http.get<Subject[]>(this.url.urlSubject);
  }

  getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(this.url.urlStudent);
  }

  getStudentsByStudies(studies): Observable<Student[]> {
    return this.http.get<Student[]>(this.url.urlStudent + '/studies/' + studies);
  }

  addStudent(subjectId, studentId){
    return this.http.post(this.url.urlSubject + '/addStudent', {subjectId: subjectId,studentId: studentId});
  }

  addSubject(subject: Subject) {
    return this.http.post(this.url.urlSubject, subject);
  }

}
