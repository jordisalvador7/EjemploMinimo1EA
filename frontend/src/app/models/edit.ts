export class Edit {
    studentId: string;
    subjectId: string;
    constructor(studentId = '', subjectId= ''){
        this.studentId = studentId;
        this.subjectId = subjectId;
      }
}
