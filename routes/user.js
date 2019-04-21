const express = require('express');
const router = express.Router();
const User = require('../schemas/user');

router.post('/signin', (req, res) => {
    let info = req.body;
    User.find({ pass: info.pass, email: info.email })
        .then(resault => {
            if (resault.length >= 1) {
                res.status(200).json(resault[0])
                console.log(resault)
            } else {
                res.status(500).send({ message: 'wrong email or nid' })
            }
        })
        .catch(err => {
            res.status(400)
        })
});

router.post('/signup', (req, res) => {
    let info = req.body;
    console.log(info)
    User.find({ email: info.email })
        .then(resault => {
            if (resault.length <= 0) {

                let newUser = new User({
                    email: info.email,
                    pass: info.pass,
                    government: info.government,
                    phone: info.phone
                });
                newUser.save()
                    .then(resault => {
                        console.log('saved')
                        res.status(200).json(resault)
                    })
                    .catch(err => {
                        res.status(400)
                    })


            } else {
                res.status(500).send({ message: 'email not available' })
            }
        })
        .catch(err => {
            res.status(400)
        })
})

module.exports = router