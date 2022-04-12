const { Router } = require('express');

const Car = require('../models/Car')

const router = Router();

router.get("/", async (req, res) => {
    try {
        const {category, name, factory, year, description, value, optional} = req.body
        const allCars = await Car.find();
        res.status(200).json(allCars);
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
})

router.post("/", async (req, res) => {
    try {
        //const userId = req.user.id;
        const {category, name, factory, year, description, value, optional} = req.body;
        const newCar = await Car.create({ ...req.body })
        res.status(200).json(newCar);
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
})

module.exports = router;