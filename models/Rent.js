const { Schema, model } = require("mongoose");

const rentSchema = new Schema({
    periodRent: {
        type: Number,
        required: true
    },
    payment: {
        type: String,
        required: true,
        default: "Credit card"
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