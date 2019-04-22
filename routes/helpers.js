const express = require('express');
const router = express.Router();
const Colors = require('../schemas/colors');
const Brands = require('../schemas/brands');

router.get('/colors', (req, res) => {
    Colors.find({})
        .then(resault => {
            res.status(200).json(resault)
        })
        .catch(err => {
            console.log(err);
            res.status(500)
        })
})

router.get('/brands', (req, res) => {
    Brands.find({})
        .then(resault => {
            res.status(200).json(resault)
        })
        .catch(err => {
            console.log(err);
            res.status(500)
        })
})

module.exports = router;