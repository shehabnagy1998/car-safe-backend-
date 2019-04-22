const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const serverMon = 'mongodb+srv://shehab90:shehab80@cluster0-fw0qv.mongodb.net/Software_Project';
// const serverMon = 'mongodb://localhost:27017/Software_Project';
const helpers = require('./routes/helpers');
const user = require('./routes/user');
const lost = require('./routes/lost');
const found = require('./routes/found');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use('/helpers', helpers);
app.use('/user', user);
app.use('/lost', lost);
app.use('/found', found);
app.use('/', express.static(path.join(__dirname, './build')));
app.use('/static', express.static(path.join(__dirname, './build/static')));

mongoose.connect(serverMon, { useNewUrlParser: true })
    .then(res => { console.log('database connected') })
    .catch(err => { console.log(err) })

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, './build/index.html'))
})

module.exports = app