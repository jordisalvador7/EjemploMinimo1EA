'use strict'

import express = require('express');
import bodyParser = require ('body-parser')
import mongoose = require ('mongoose');
import cors = require ('cors');
import errorHandler = require ('errorhandler');

//Route imports
let api = require ('./backend/routes/schoolService');

//server variable initialization
let app = express();
//app.pep
app.use(cors());
app.options('*', cors());

app.use(express.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());
app.use(errorHandler());

app.use('',api);

app.get('/', function (req, res) {
    res.send('Hello World!');
})

//Mongo DB connection
mongoose.connect('mongodb://localhost:27017/school', {
    useNewUrlParser: true,
    reconnectTries: Number.MAX_VALUE,
    autoReconnect: true,
    useUnifiedTopology: true,
    reconnectInterval:500
}).then(() => {
    console.log('Connection to DB successful');
    app.listen(3000, () => {
        console.log('Minimo 1 corriendo en http://localhost:3000')
        module.exports = app;
    }) 
}).catch(err => {
    console.log(`Database error: ${err.message}`);
});

//DB connection events
mongoose.connection.on('reconnected', () => {
    console.log('Database reconnected');
});

mongoose.connection.on('error', (err: any) => {
    console.log(`Database error: ${err.message}`);
})

mongoose.connection.on('disconnected', () => {
    console.log('Database disconnected');
    //If it desconnects, it tries again
    mongoose.connect('mongodb://localhost:27017/school', {
        useNewUrlParser: true,
        reconnectTries: Number.MAX_VALUE,
        autoReconnect: true,
        useUnifiedTopology: true,
        reconnectInterval:500
    });
});

