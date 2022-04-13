const { Router } = require('express');
const { restart } = require('nodemon');

const Car = require('../models/Car')

const router = Router();

router.get("/", async (req, res) => {
    try {
        const allCars = await Car.find();
        res.status(200).json(allCars);
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

router.post("/", async (req, res) => {
    try {
        //const userId = req.user.id;
        const {
            category,
            name,
            factory,
            year,
            description,
            value,
            optional
        } = req.body;
        const newCar = await Car.create({ ...req.body })
        res.status(200).json(newCar);
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
})

router.put("/:carId", async (req, res) => {
    const { carId } = req.params;
    try {
        const updateCar = await Car.findByIdAndUpdate({ _id: carId },
            req.body,
            { new: true });
        res.status(200).json(updateCar);
    } catch (error) {
        restart.status(500).json({ error: error.message })
    }
})

router.delete("/:carId", async (req, res) => {
    const { carId } = req.params;
    try {
        const deleteCar = await Car.findByIdAndDelete({ _id: carId }, { new: true });
        res.status(200).json(deleteCar)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

module.exports = router;