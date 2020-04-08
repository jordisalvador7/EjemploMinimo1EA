'use strict';
export{}

require ('../models/student');
require ('../models/subject');

let mongoose = require ('mongoose');
let Student = mongoose.model('Student');
let Subject = mongoose.model('Subject');
let ObjectId = require('mongodb').ObjectId;

exports.addStudent = async function (req, res){
    let student = req.body;
    let newStudent = new Student (student);
    let result = await newStudent.save();
    if(result){
        res.status(200).send(result);
    }
    else{
        res.status(400).send(result);
    }
}

exports.getStudentByStudies = async function (req, res){
    let s = req.params.id;
    console.log(s);
    let students = await Student.find({studies: {$elemMatch: {name : s}}});
    console.log('Students: '+ students);
    res.status(200).json(students);
}

exports.getStudentById = async function(req, res) {
    let s = req.params.id;
    console.log(s);
    let student = await Student.findOne({_id: s});
    if(student){
        res.status(200).json(student);
    }
    else{
        res.status(404).send({message: 'Student not found'});
    }
};

exports.getStudents = async function(req, res){
    let students = await Student.find();
    res.status(200).json(students);
}