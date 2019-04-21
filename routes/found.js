const express = require('express');
const router = express.Router();
const uuid = require('uuid/v1');
const carFound = require('../schemas/car_found');

router.get('/', (req, res) => {
    carFound.getAll()
        .then(resault => {
            res.status(200).json(resault)
        })
        .catch(err => {
            console.log(err);
            res.status(500)
        })
})

router.post('/add', (req, res) => {
    let report = req.body;

    // check if report aleardy exist
    carFound.find({ lic_pla_num: report.lic_pla_num, lic_pla_let: report.lic_pla_let.toUpperCase() })
        .then(findRes => {
            if (findRes.length <= 0) {
                // no report exist so save new one to database
                const newFound = new carFound({
                    reportID: uuid(),
                    lic_pla_num: report.lic_pla_num,
                    lic_pla_let: report.lic_pla_let,
                    address: report.address,
                    date: report.date,
                    color: report.color,
                    brand: report.brand,
                    userEmail: report.userEmail
                });
                newFound.save()
                    .then(resault => {
                        console.log('saved');
                        res.status(200).json(resault)
                    })
                    .catch(err => {
                        res.status(500)
                    })
            } else {
                res.status(400).send({ message: 'report with same license plate exist' })
            }
        })
        .catch(err => {
            console.log(err);
            res.status(502)
        })

})

router.delete('/remove/:id', (req, res) => {
    let id = req.params.id;
    carFound.findOneAndDelete({ reportID: id })
        .then(resault1 => {
            carFound.getAll()
                .then(resault => {
                    res.status(200).json(resault)
                })
                .catch(err => {
                    console.log(err);
                    res.status(500)
                })
        })
        .catch(err => {
            res.status(500)
        })
})

module.exports = router;