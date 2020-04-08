'use strict'
export{};

require('../models/student');
require('../models/subject');

let mongoose = require ('mongoose');
let Subject = mongoose.model('Subject');
let Student = mongoose.model('Student');
let ObjectId = require('mongodb').ObjectID;

exports.addSubject = async function (req,res){
    let subject = new Subject();
    subject.name = req.body.name;
    let newSubject = new Subject(subject);
    let result = await newSubject.save();
    res.status(200).send(result);
};

exports.addStudentToSubject = async function (req,res){
    let subjectId = req.body.subjectId;
    let studentId = req.body.studentId;
    console.log('Subject Id: ' +subjectId);
    console.log('Student Id: ' +studentId);

    let student = await Student.findOne({_id: studentId});
    if(!student){
        return res.status(404).send({message: 'Student not found'});
    }
    else{
        let subjectUpdated = await Subject.findOne({_id: subjectId});
        if(!subjectUpdated){
            return res.status(404).send({message: 'Student not found'});
        }
        else{
            await Subject.updateOne({_id: subjectId}, {$addToSet: {students: studentId}});
        }
    }
    return res.status(200).send({message: 'Student added to the subject successfully'});
};

exports.getSubjects = async function (req,res){
    let subjects = await Subject.find()
        .populate('students');
    if (subjects) {
        res.status(200).json(subjects);
    }
    else{
        res.status(424).send({message: 'Subjects not found'});
    }    
};