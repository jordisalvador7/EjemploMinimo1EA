import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Environment {
  urlStudent = 'http://localhost:3000/student';
  urlSubject = 'http://localhost:3000/subject';
}
