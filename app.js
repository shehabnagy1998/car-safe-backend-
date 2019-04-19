const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer');
const app = express();
const PORT = process.env.PORT || 8000;

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

app.post('/api/email', (req, res) => {
    const mail = req.body;
    const mailOptions = {
        from: mail.email, // sender address
        to: 'shehab.nagy1998@gmail.com', // list of receivers
        subject: mail.email, // Subject line
        html: `
            <div>
                <p>name:</p>
                <p style="margin-left:50px;">${mail.name}</p>
            </div>
            <div>
                <p>phone:</p>
                <p style="margin-left:50px;">${mail.phone}</p>
            </div>
            <div>
                <p>email:</p>
                <p style="margin-left:50px;">${mail.email}</p>
            </div>
            <div>
                <p>service:</p>
                <p style="margin-left:50px;">${mail.service}</p>
            </div>
            <div>
                <p>message:</p>
                <p style="margin-left:50px;">${mail.message}</p>
            </div>
        `// plain text body
    };
    transporter.sendMail(mailOptions, function (err, ress) {
        if (err)
            console.log(err)
        else {
            console.log(mail)
            res.json(ress);
        }
    });
});

app.listen(PORT, (err) => {
    if (err)
        console.log(err)
    console.log(`listen on port ${PORT}`)
})