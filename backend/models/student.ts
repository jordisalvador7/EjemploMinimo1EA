import mongoose = require ('mongoose');

//Definition of student schema

let studentSchema  = new mongoose.Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
    phones: [{
        key: String,
        value: String
    }] ,
    studies: [{
        name: String
    }]
});

//Export
module.exports = mongoose.model ('Student', studentSchema);