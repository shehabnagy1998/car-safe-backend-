const express = require('express');
const router = express.Router();
const uuid = require('uuid/v1');
const carLost = require('../schemas/car_lost');
const carFound = require('../schemas/car_found');

const isEmpty = function (object) {
    for (var key in object) {
        if (object.hasOwnProperty(key)) {
            return false
        }
    }
    return true
}

router.get('/', (req, res) => {
    carLost.find({})
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
    let isMatch = false;

    // check if report aleardy exist
    carLost.find({ lic_pla_num: report.lic_pla_num, lic_pla_let: report.lic_pla_let.toUpperCase() })
        .then(findRes => {
            if (findRes.length <= 0) {

                carFound.findOneAndUpdate({ lic_pla_num: report.lic_pla_num, lic_pla_let: report.lic_pla_let.toUpperCase() },
                    { isMatch: true, loserPhone: report.phone })
                    .then(foundRes => {

                        if (!isEmpty(foundRes)) {
                            isMatch = true
                        }
                        // no report exist so save new one to database
                        const newLost = new carLost({
                            reportID: uuid(),
                            lic_pla_num: report.lic_pla_num,
                            lic_pla_let: report.lic_pla_let,
                            phone: report.phone,
                            engine_no: report.engine_no,
                            vin_no: report.vin_no,
                            date: report.date,
                            color: report.color,
                            brand: report.brand,
                            isMatch: isMatch,
                            founderPhone: !isEmpty(foundRes) ? foundRes.phone : ''
                        });
                        newLost.save()
                            .then(resault => {
                                console.log('saved');
                                res.status(200).json(resault)
                            })
                            .catch(err => {
                                console.log(err)
                                res.status(500).send({ message: 'error occured' })
                            })


                    })
                    .catch(err => {
                        console.log(err)
                        res.status(400).send({ message: 'error occured' })
                    })

            } else {
                res.status(400).send({ message: 'report with same license plate exist' })
            }
        })
        .catch(err => {
            console.log(err);
            res.status(502).send({ message: 'error occured' })
        })
})

router.delete('/remove/:id', (req, res) => {
    let id = req.params.id;
    carLost.findOneAndDelete({ reportID: id })
        .then(resault1 => {
            carLost.find({})
                .then(resault => {
                    res.status(200).json(resault)
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).send({ message: 'error occured' })
                })
        })
        .catch(err => {
            console.log(err);
            res.status(500).send({ message: 'error occured' })
        })
})

module.exports = router;