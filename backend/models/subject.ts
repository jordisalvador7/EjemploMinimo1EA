import mongoose = require ('mongoose');

//Definition of subject schema
let subjectSchema = new mongoose.Schema({
    name: {type: String, required: true},
    students:[{type: mongoose.Types.ObjectId, ref: 'Student' }]
});

//Export
module.exports = mongoose.model ('Subject', subjectSchema);