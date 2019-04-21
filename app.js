const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const serverMon = 'mongodb+srv://shehab90:shehab80@cluster0-fw0qv.mongodb.net/Software_Project';
const helpers = require('./routes/helpers');
const user = require('./routes/user');
const lost = require('./routes/lost');
const found = require('./routes/found');

//CORS middleware
const allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cors({
//     origin: '*',
//     optionsSuccessStatus: 200
// }));
app.use(allowCrossDomain);
app.use('/helpers', helpers);
app.use('/user', user);
app.use('/lost', lost);
app.use('/found', found);

mongoose.connect(serverMon, { useNewUrlParser: true })
    .then(res => { console.log('database connected') })
    .catch(err => { console.log(err) })

module.exports = app