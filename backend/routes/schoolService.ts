import express = require ('express');

let api: express.Router = express.Router();

let studentScript = require ('../controllers/studentScript');
let subjectScrpit = require ('../controllers/subjectScript');

//Students Service
api.get('/student/:id', studentScript.getStudentById);
api.post('/student', studentScript.addStudent);
api.get('/student', studentScript.getStudents);
api.get('/student/studies/:id', studentScript.getStudentByStudies);

//Subject Service
api.get('/subject', subjectScrpit.getSubjects);
api.post('/subject', subjectScrpit.addSubject);
api.post('/subject/addStudent', subjectScrpit.addStudentToSubject);

module.exports = api;
