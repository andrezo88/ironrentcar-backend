const { Router } = require("express");

const User = require("../models/User");
const Car = require("../models/Car");
const Rent = require("../models/Rent");

const router = Router();

router.get("/", async (req, res) => {
    try {
        const userId = req.user.id;
        // const userId = "6255d9314f9a3d577afc35f1"; // mocado

        const allCars = await Rent.find({ user: userId })
        res.status(200).json(allCars)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
});

router.post("/:carId", async (req, res) => {

    try {
        const userId = req.user.id;
        const { carId } = req.params;
        const { periodRent, payment } = req.body;
        
        const car = await Car.findById(carId)
        const valueCar = periodRent * car.value; 

        const newRent = await Rent.create({ ...req.body, user: userId, car: carId, value: valueCar, periodRent, payment });
        await User.findByIdAndUpdate(userId, { $push: { rent: newRent.id } });
        res.status(200).json(newRent);
    } catch (error) {
        res.status(500).json( {error: error.message} )
    }
});

router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;
  
        // const userId = "6255d9314f9a3d577afc35f1"; // mocado
    try {
        const updateCar = await Car.findByIdAndUpdate( {_id: id, user: userId}, req.body, {new: true,})
        if(!updatedRent) {
            throw new Error("cannot update car from user")
        }
        res.status(200).json(updatedRent)
    } catch (error) {
        res.status(500).json({ error: error.message})
    }
});

router.delete("/:id", async (req, res) => {
    const { id } = req.params;
       const userId = req.user.id;
        // const userId = "6255d9314f9a3d577afc35f1"; // mocado
    try {
        const rent = await Rent.findById(id);
        if(rent.user.toString() !== userId) {
        throw new Error("Cannot delete")
        } rent.delete();
        res.status(200).json();
    } catch (error) {
        res.status(500).json( {error: error.message})
    }
});
module.exports = router;