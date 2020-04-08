'use strict'
import { Student } from '../models/student';

export class Subject {
    _id: String;
  name: String;
  students: Student[];

  constructor(_id = '', name = '', students = null ) {
    this._id = _id;
    this.name = name;
    this.students = students;
  }
}
