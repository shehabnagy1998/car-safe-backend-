const express = require('express');
const router = express.Router();
const Colors = require('../schemas/colors');
const Brands = require('../schemas/brands');

router.get('/colors', (req, res) => {
    Colors.getAll()
        .then(resault => {
            res.status(200).json(resault)
        })
        .catch(err => {
            console.log(err);
            res.status(500)
        })
})

router.get('/brands', (req, res) => {
    Brands.getAll()
        .then(resault => {
            res.status(200).json(resault)
        })
        .catch(err => {
            console.log(err);
            res.status(500)
        })
})

router.get('/lost', (req, res) => {

})

router.post('/lost/add', (req, res) => {

})

router.delete('/lost/remove/:id', (req, res) => {

})

router.get('/found', (req, res) => {

})

router.post('/found/add', (req, res) => {

})

router.delete('/found/remove/:id', (req, res) => {

})

module.exports = router;