const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer');
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'shehab.nagy1998@gmail.com',
        pass: 'LVsh98oro98uk'
    }
});

app.post('/api/mail', (req, res) => {
    let info = req.body;
    const mailOptions = {
        from: 'shehab.nagy1998@gmail.com', // sender address
        to: 'shehab.nagy1998@gmail.com', // list of receivers
        subject: info.email, // Subject line
        html: `
            <div>
                <p>name:</p>
                <p style="margin-left:50px;">${info.name}</p>
            </div>
            <div>
                <p>phone:</p>
                <p style="margin-left:50px;">${info.phone}</p>
            </div>
            <div>
                <p>email:</p>
                <p style="margin-left:50px;">${info.email}</p>
            </div>
            <div>
                <p>service:</p>
                <p style="margin-left:50px;">${info.service}</p>
            </div>
            <div>
                <p>message:</p>
                <p style="margin-left:50px;">${info.message}</p>
            </div>
        `// plain text body
    };
    console.log(info);
    transporter.sendMail(mailOptions, function (err, info) {
        if (err)
            console.log(err)
        else
            res.json(info);
    });
});

module.exports = app;