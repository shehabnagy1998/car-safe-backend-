const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const serverMon = 'mongodb+srv://shehab90:shehab80@cluster0-fw0qv.mongodb.net/Software_Project';
const api = require('./routes/api');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/api', api);

mongoose.connect(serverMon, { useNewUrlParser: true })
    .then(res => { console.log('database connected') })
    .catch(err => { console.log(err) })

module.exports = app