const express = require('express');
const router = express.Router();
const uuid = require('uuid/v1');
const carFound = require('../schemas/car_found');
const carLost = require('../schemas/car_lost');

const isEmpty = function (object) {
    for (var key in object) {
        if (object.hasOwnProperty(key)) {
            return false
        }
    }
    return true
}

router.get('/', (req, res) => {
    carFound.find({})
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
    let isMatch = false

    // check if report aleardy exist
    carFound.find({ lic_pla_num: report.lic_pla_num, lic_pla_let: report.lic_pla_let.toUpperCase() })
        .then(findRes => {
            if (findRes.length <= 0) {

                // check if there is match
                carLost.findOneAndUpdate(
                    { lic_pla_num: report.lic_pla_num, lic_pla_let: report.lic_pla_let.toUpperCase() },
                    { isMatch: true, founderEmail: report.userEmail })
                    .then(lostRes => {

                        if (!isEmpty(lostRes)) {
                            isMatch = true
                        }


                        // no report exist so save new one to database
                        const newFound = new carFound({
                            reportID: uuid(),
                            lic_pla_num: report.lic_pla_num,
                            lic_pla_let: report.lic_pla_let,
                            address: report.address,
                            date: report.date,
                            color: report.color,
                            brand: report.brand,
                            userEmail: report.userEmail,
                            isMatch: isMatch
                        });
                        newFound.save()
                            .then(resault => {
                                console.log('saved');
                                res.status(200).json(resault)
                            })
                            .catch(err => {
                                console.log(err);
                                res.status(500).send({ message: 'error occured' })
                            })


                    })
                    .catch(err => {
                        console.log(err)
                        res.status(400)
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