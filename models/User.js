const { Schema, model } = require("mongoose");

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        match: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/
    },
    passwordHash: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    role: {
        type: Boolean,
        default: false
    },
}, {
    timestamps: true
})

module.exports = model("User", userSchema);