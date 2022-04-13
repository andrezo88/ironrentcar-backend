const { Schema, model } = require("mongoose");

const rentSchema = new Schema({
    periodRent: {
        type: Date,
        required: true
    },
    payment: {
        type: String,
        required: true
    },
    value: {
        type: Number,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    car: {
        type: Schema.Types.ObjectId,
        ref: "Car"
    }
},
    {
        timestamps: true,
    })
module.exports = model("Rent", rentSchema)