const { Router } = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User')
const Car = require('../models/Car')
const router = Router();

router.post("/signup", async (req, res) => {
    try {
        const { name, email, adm, passwordHash } = req.body;

        if (!name || !email || !passwordHash) {
            throw new Error("All fields must be provided")
        }

        const user = await User.findOne({ email })

        if (user) {
            throw new Error("Email already in use")
        }

        const salt = bcrypt.genSaltSync(12);

        const hash = bcrypt.hashSync(passwordHash, salt);

        const newUser = await User.create({
            name,
            email,
            adm,
            passwordHash: hash,
        });

        res.status(201).json({
            name: newUser.name,
            email: newUser.email
        })

    } catch (error) {
        if (error.message === "Email already in use") {
            return res.status(400).json({ msg: error.message });
        }
        res.status(500).json({ msg: error.message });
    }
})

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const userFromDb = await User.findOne({ email });

        if (!userFromDb) {
            const error = new Error("Email or password is incorrect");
            error.status = 400;
            throw error;
        }

        const compareHash = bcrypt.compareSync(password, userFromDb.passwordHash);

        if (!compareHash) {
            const error = new Error("Email or password is incorrect");
            error.status = 401;
            throw error
        }

        const payloadUser = {
            id: userFromDb._id,
            name: userFromDb.name,
            email
        }


        const token = jwt.sign(payloadUser, process.env.SECRET_JWT, {
            expiresIn: "1day",
        });

        res.status(200).json({ user: payloadUser, token });

    } catch (error) {
        res.status(error.status || 500).json({ msg: error.message })
    }
});

module.exports = router;