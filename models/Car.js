const { Schema, model } = require("mongoose")

const carSchema = new Schema({
    category: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
        unique: true
    },
    factory: {
        type: string,
        required: true,
        unique: true
    },
    year: {
        type: date,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    value: {
        type: Number,
        required: true
    },
    image: {
        type: String
    },
    optional: {
        type: String,
        required: true
    },
}, {
    timestamps: true,
})

module.exports = model("Car", carSchema)